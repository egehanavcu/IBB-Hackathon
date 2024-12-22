package com.isthackathon.takimyildiz.business.concretes;

import com.isthackathon.takimyildiz.business.abstracts.LineService;
import com.isthackathon.takimyildiz.business.abstracts.SharedService;
import com.isthackathon.takimyildiz.business.abstracts.TurnstileService;
import com.isthackathon.takimyildiz.business.abstracts.UserService;
import com.isthackathon.takimyildiz.business.constants.TurnstileMessages;
import com.isthackathon.takimyildiz.core.results.*;
import com.isthackathon.takimyildiz.dataAccess.TurnstileDao;
import com.isthackathon.takimyildiz.entities.Line;
import com.isthackathon.takimyildiz.entities.Shared;
import com.isthackathon.takimyildiz.entities.Turnstile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TurnstileManager implements TurnstileService {

    private final TurnstileDao turnstileDao;

    private final UserService userService;

    private final LineService lineService;

    private final SharedService sharedService;

    public TurnstileManager(TurnstileDao turnstileDao, UserService userService, LineService lineService, SharedService sharedService) {
        this.turnstileDao = turnstileDao;
        this.userService = userService;
        this.lineService = lineService;
        this.sharedService = sharedService;
    }

    @Override
    public DataResult<List<Turnstile>> getTurnstilesOfAuthenticatedUser() {
        var authenticatedUser = userService.getAuthenticatedUser();
        if (!authenticatedUser.isSuccess()) {
            return new ErrorDataResult<>(authenticatedUser.getMessage(), authenticatedUser.getHttpStatus());
        }

        var turnstiles = turnstileDao.findAllByUser(authenticatedUser.getData());
        if (turnstiles.isEmpty()) {
            return new ErrorDataResult<>(TurnstileMessages.noTurnstilesFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<>(turnstiles, TurnstileMessages.turnstilesListed, HttpStatus.OK);

    }

    @Override
    public Result passCard(String vehicleCode, String cardId, String lineCode) {

        var cardUserResult = userService.getUserByCardId(cardId);
        if (!cardUserResult.isSuccess()) {
            return new ErrorDataResult<>(cardUserResult.getMessage(), cardUserResult.getHttpStatus());
        }

        var lineResult = lineService.getLineByCode(lineCode);
        if (!lineResult.isSuccess()) {
            return new ErrorDataResult<>(lineResult.getMessage(), lineResult.getHttpStatus());
        }


        Turnstile turnstile = Turnstile.builder()
                .user(cardUserResult.getData())
                .vehicleCode(vehicleCode)
                .line(lineResult.getData())
                .passTime(LocalDateTime.now())
                .hasExited(false)
                .build();

        turnstileDao.save(turnstile);

        return new SuccessDataResult<>(TurnstileMessages.passSuccess, lineResult.getHttpStatus());

    }

    @Override
    public Result leaveVehicle(String vehicleCode) {
       var turnstile = turnstileDao.findByVehicleCodeAndHasExited(vehicleCode, false);
        if (turnstile.isEmpty()) {
            return new ErrorDataResult<>(TurnstileMessages.noTurnstileFound, HttpStatus.NOT_FOUND);
        }

        var turnstileToSave = turnstile.get(0);
        turnstileToSave.setHasExited(true);
        turnstileDao.save(turnstileToSave);

        return new SuccessResult(TurnstileMessages.passSuccess, HttpStatus.OK);

    }

    @Override
    public DataResult<List<Turnstile>> getTurnstilesByUserId(UUID id) {

        var userResult = userService.getUserById(id);
        if (!userResult.isSuccess()) {
            return new ErrorDataResult<>(userResult.getMessage(), userResult.getHttpStatus());
        }

        var shareds = sharedService.getAllPublishedSharedsOfAuthenticatedUser();
        if (!shareds.isSuccess()) {
            return new ErrorDataResult<>(shareds.getMessage(), shareds.getHttpStatus());
        }

        for (Shared shared : shareds.getData()) {
            if (!shared.getPublished().getId().equals(userResult.getData().getId())) {
                return new ErrorDataResult<>(TurnstileMessages.noTurnstilesFound, HttpStatus.NOT_FOUND);
            }
        }

        var turnstiles = turnstileDao.findAllByUser(userResult.getData());
        if (turnstiles.isEmpty()) {
            return new ErrorDataResult<>(TurnstileMessages.noTurnstilesFound, HttpStatus.NOT_FOUND);
        }

        return new SuccessDataResult<>(turnstiles, TurnstileMessages.turnstilesListed, HttpStatus.OK);
    }

    @Override
    public DataResult<List<Turnstile>> getSharedTurnstiles(UUID publisherId) {
        var authenticatedUser = userService.getAuthenticatedUser();
        if (!authenticatedUser.isSuccess()) {
            return new ErrorDataResult<>(authenticatedUser.getMessage(), authenticatedUser.getHttpStatus());
        }

        var shareds = sharedService.getAllPublishedSharedsOfAuthenticatedUser();
        if (!shareds.isSuccess()) {
            return new ErrorDataResult<>(shareds.getMessage(), shareds.getHttpStatus());
        }

        for (Shared shared : shareds.getData()) {
            if (shared.isActive() && shared.getPublisher().getId().equals(publisherId)) {

                var turnstiles = turnstileDao.findAllByUser(shared.getPublisher());

                if (turnstiles.isEmpty()) {
                    return new ErrorDataResult<>(TurnstileMessages.noTurnstilesFound, HttpStatus.NOT_FOUND);
                }

                return new SuccessDataResult<>(turnstiles, TurnstileMessages.turnstilesListed, HttpStatus.OK);
            }
        }

        return new ErrorDataResult<>(TurnstileMessages.noTurnstilesFound, HttpStatus.NOT_FOUND);
    }

}
