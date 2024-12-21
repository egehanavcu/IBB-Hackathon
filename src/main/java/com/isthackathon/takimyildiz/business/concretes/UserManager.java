package com.isthackathon.takimyildiz.business.concretes;



import com.isthackathon.takimyildiz.business.abstracts.UserService;
import com.isthackathon.takimyildiz.business.constants.UserMessages;
import com.isthackathon.takimyildiz.core.results.*;
import com.isthackathon.takimyildiz.dataAccess.UserDao;
import com.isthackathon.takimyildiz.entities.Role;
import com.isthackathon.takimyildiz.entities.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class UserManager implements UserService {

    private final UserDao userDao;

    private final PasswordEncoder passwordEncoder;

    public UserManager(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return getUserById(UUID.fromString(username)).getData();
    }

    @Override
    public DataResult<User> getUserById(UUID userId) {
        var result = userDao.findById(userId);

        if (!result.isPresent() ){
            return new ErrorDataResult<>(UserMessages.userNotFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<User>(result.get(), UserMessages.userFound, HttpStatus.OK);
    }

    @Override
    public DataResult<User> getUserByPhoneNumber(String phoneNumber) {
        var result = userDao.findByPhoneNumber(phoneNumber);

        if (!result.isPresent()){
            return new ErrorDataResult<>(UserMessages.userNotFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<User>(result.get(), UserMessages.userFound, HttpStatus.OK);
    }

    @Override
    public Result addUser(User user) {
        if (user.getFirstName() == null ){
            return new ErrorDataResult<>(UserMessages.firstNameCannotBeNull, HttpStatus.BAD_REQUEST);
        }

        if (user.getLastName() == null ){
            return new ErrorDataResult<>(UserMessages.lastNameCannotBeNull, HttpStatus.BAD_REQUEST);
        }

        if (user.getPhoneNumber() == null ){
            return new ErrorDataResult<>(UserMessages.phoneNumberCannotBeNull, HttpStatus.BAD_REQUEST);
        }

        if (user.getPassword() == null ){
            return new ErrorDataResult<>(UserMessages.passwordCannotBeNull, HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setAuthorities(Set.of(Role.ROLE_USER));

        userDao.save(user);

        return new SuccessResult(UserMessages.userAdded, HttpStatus.CREATED);
    }

    @Override
    public DataResult<List<User>> getAllUsers() {
        var result = userDao.findAll();

        if (result.isEmpty()){
            return new ErrorDataResult<>(UserMessages.usersNotFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<>(result, UserMessages.usersFound, HttpStatus.OK);
    }

    @Override
    public DataResult<User> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() == "anonymousUser"){
            return new ErrorDataResult<>(UserMessages.userIsNotAuthenticatedPleaseLogin, HttpStatus.UNAUTHORIZED);
        }
        return getUserById(UUID.fromString(authentication.getName()));

    }

    @Override
    public Result assignIstanbulCardToUser(String istanbulCardId) {

        if (istanbulCardId == null){
            return new ErrorResult(UserMessages.istanbulCardIdCannotBeNull, HttpStatus.BAD_REQUEST);
        }

        var userResult = getAuthenticatedUser();
        if (!userResult.isSuccess()){
            return userResult;
        }

       var user = userResult.getData();

        user.setIstanbulCardId(istanbulCardId);

        userDao.save(user);

        return new SuccessResult(UserMessages.istanbulCardAssigned, HttpStatus.OK);
    }
}
