package com.isthackathon.takimyildiz.business.concretes;

import com.isthackathon.takimyildiz.business.abstracts.AuthService;
import com.isthackathon.takimyildiz.business.abstracts.UserService;
import com.isthackathon.takimyildiz.business.constants.AuthMessages;
import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.ErrorDataResult;
import com.isthackathon.takimyildiz.core.results.Result;
import com.isthackathon.takimyildiz.core.results.SuccessDataResult;
import com.isthackathon.takimyildiz.core.security.JwtService;
import com.isthackathon.takimyildiz.entities.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthManager implements AuthService {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    public AuthManager(UserService userService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    public Result registerUser(User user) {

        var result = userService.addUser(user);

        return result;

    }

    @Override
    public DataResult<String> login(User loginRequest) {
        if (loginRequest.getPhoneNumber() == null) {
            return new ErrorDataResult<>(AuthMessages.phoneNumberCannotBeNull, HttpStatus.BAD_REQUEST);
        }
        if (loginRequest.getPassword() == null) {
            return new ErrorDataResult<>(AuthMessages.passwordCannotBeNull, HttpStatus.BAD_REQUEST);
        }
        var dbUserResult = userService.getUserByPhoneNumber(loginRequest.getPhoneNumber());
        if (!dbUserResult.isSuccess()) {
            return new ErrorDataResult<>(dbUserResult.getMessage(), dbUserResult.getHttpStatus());
        }
        User dbUser = dbUserResult.getData();
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dbUser.getId().toString(), loginRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(dbUser);
            return new SuccessDataResult<>(token, AuthMessages.loginSuccess, HttpStatus.CREATED);
        }
        return new ErrorDataResult<>(AuthMessages.invalidUsernameOrPassword, HttpStatus.BAD_REQUEST);
    }

}
