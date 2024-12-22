package com.isthackathon.takimyildiz.webAPI.controllers;

import com.isthackathon.takimyildiz.business.abstracts.UserService;
import com.isthackathon.takimyildiz.core.results.Result;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/assignIstanbulCardToAuthenticatedUser")
    public ResponseEntity<Result> assignIstanbulCardToUser(@RequestParam String istanbulCardId){
        var result = userService.assignIstanbulCardToUser(istanbulCardId);

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @GetMapping("/getAuthenticatedUser")
    public ResponseEntity<?> getAuthenticatedUser() {
        var result = userService.getAuthenticatedUser();
        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }


}
