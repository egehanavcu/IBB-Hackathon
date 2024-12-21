package com.isthackathon.takimyildiz.business.concretes;

import com.isthackathon.takimyildiz.business.abstracts.SharedService;
import com.isthackathon.takimyildiz.business.abstracts.UserService;
import com.isthackathon.takimyildiz.business.constants.SharedMessages;
import com.isthackathon.takimyildiz.core.results.*;
import com.isthackathon.takimyildiz.dataAccess.SharedDao;
import com.isthackathon.takimyildiz.entities.Role;
import com.isthackathon.takimyildiz.entities.ShareType;
import com.isthackathon.takimyildiz.entities.Shared;
import com.isthackathon.takimyildiz.entities.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SharedManager implements SharedService {

    private final SharedDao sharedDao;

    private final UserService userService;

    public SharedManager(SharedDao sharedDao, UserService userService) {
        this.sharedDao = sharedDao;
        this.userService = userService;
    }

    @Override
    public Result addShared(Shared shared) {
        var authenticatedUser = userService.getAuthenticatedUser();
        if (!authenticatedUser.isSuccess()){
            return authenticatedUser;
        }

        if (shared.getShareType() == null){
            return new ErrorResult(SharedMessages.shareTypeCannotBeNull, HttpStatus.BAD_REQUEST);
        }

        if (!shared.getShareType().equals(ShareType.FRIEND) && !shared.getShareType().equals(ShareType.PARENT)){
            return new ErrorResult(SharedMessages.shareTypeNotValid, HttpStatus.BAD_REQUEST);
        }

        shared.setPublisher(authenticatedUser.getData());
        shared.setActive(false);
        shared.setShareStartTime(LocalDateTime.now());

        sharedDao.save(shared);

        return new SuccessResult(SharedMessages.sharedAdded, HttpStatus.CREATED);
    }

    @Override
    public DataResult<List<Shared>> getAllSharedsOfAuthenticatedUser() {
        var authenticatedUser = userService.getAuthenticatedUser();
        if (!authenticatedUser.isSuccess()){
            return new ErrorDataResult<>(authenticatedUser.getMessage(), HttpStatus.UNAUTHORIZED);
        }

        var shareds = sharedDao.findAllByPublisher(authenticatedUser.getData());
        if (shareds.isEmpty()){
            return new ErrorDataResult<>(SharedMessages.sharedNotFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<>(shareds, SharedMessages.sharedListed, HttpStatus.OK);
    }

    @Override
    public Result acceptShared(UUID sharedId) {
       var authenticatedUser = userService.getAuthenticatedUser();
         if (!authenticatedUser.isSuccess()){
              return authenticatedUser;
         }

         var sharedResult = sharedDao.findById(sharedId);
         if (sharedResult.isEmpty()){
             return new ErrorResult(SharedMessages.sharedNotFound, HttpStatus.NOT_FOUND);
         }

         var shared = sharedResult.get();
         if (shared.isActive()){
             return new ErrorResult(SharedMessages.sharedAlreadyAccepted, HttpStatus.BAD_REQUEST);
         }

         if (shared.getPublisher().getId().equals(authenticatedUser.getData().getId())){
             return new ErrorResult(SharedMessages.sharedCannotBeAcceptedByPublisher, HttpStatus.BAD_REQUEST);
         }

         if (!shared.getPublished().getId().equals(authenticatedUser.getData().getId())){
                return new ErrorResult(SharedMessages.sharedCannotBeAcceptedByAnotherUser, HttpStatus.BAD_REQUEST);
         }

            shared.setActive(true);

            sharedDao.save(shared);

            return new SuccessResult(SharedMessages.sharedAccepted, HttpStatus.OK);

    }

    @Override
    public Result checkIfParentOfChild(User parent, User child) {
        List<Shared> shareds = sharedDao.findAllByPublisherAndPublishedAndShareType(child, parent, ShareType.PARENT);

        if (shareds.isEmpty()){
            return new ErrorResult(SharedMessages.parentOfChildNotFound, HttpStatus.NOT_FOUND);
        }

        for(Shared shared : shareds){
            if (shared.isActive()){
                return new SuccessResult(SharedMessages.parentOfChildFound, HttpStatus.OK);
            }
        }

        return new ErrorResult(SharedMessages.parentOfChildNotFound, HttpStatus.NOT_FOUND);
    }
}
