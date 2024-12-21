package com.isthackathon.takimyildiz.webAPI.controllers;

import com.isthackathon.takimyildiz.business.abstracts.AuthService;
import com.isthackathon.takimyildiz.core.results.Result;
import com.isthackathon.takimyildiz.entities.User;
import com.isthackathon.takimyildiz.webAPI.dtos.auth.LoginDto;
import com.isthackathon.takimyildiz.webAPI.dtos.auth.RegisterDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        User user = User.builder()
                .phoneNumber(loginDto.getPhoneNumber())
                .password(loginDto.getPassword())
                .build();

        var result = authService.login(user);

        return ResponseEntity.status(result.getHttpStatus()).body(result);

    }

    @PostMapping("/register")
    public ResponseEntity<Result> register(@RequestBody RegisterDto registerDto){
        User user = User.builder()
                .firstName(registerDto.getFirstName())
                .lastName(registerDto.getLastName())
                .phoneNumber(registerDto.getPhoneNumber())
                .password(registerDto.getPassword())
                .build();

        var result = authService.registerUser(user);

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }


}
