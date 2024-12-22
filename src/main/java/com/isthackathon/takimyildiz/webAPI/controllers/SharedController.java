package com.isthackathon.takimyildiz.webAPI.controllers;

import com.isthackathon.takimyildiz.business.abstracts.SharedService;
import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.core.results.Result;
import com.isthackathon.takimyildiz.entities.Shared;
import com.isthackathon.takimyildiz.entities.Turnstile;
import com.isthackathon.takimyildiz.entities.User;
import com.isthackathon.takimyildiz.webAPI.dtos.shareds.SharedAddDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/shareds")
public class SharedController {

    private final SharedService sharedService;

    public SharedController(SharedService sharedService) {
        this.sharedService = sharedService;
    }


    @GetMapping("/getAllSharedsOfAuthenticatedUser")
    public ResponseEntity<DataResult<List<Shared>>> getAllPublisherSharedsOfAuthenticatedUser(){
        var result = sharedService.getAllPublisherSharedsOfAuthenticatedUser();

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @GetMapping("/getAllPublishedSharedsOfAuthenticatedUser")
    public ResponseEntity<DataResult<List<Shared>>> getAllPublishedSharedsOfAuthenticatedUser(){
        var result = sharedService.getAllPublishedSharedsOfAuthenticatedUser();

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @GetMapping("/getAllPublishedAndPublisherSharedsOfAuthenticatedUser")
    public ResponseEntity<DataResult<List<Shared>>> getAllPublishedAndPublisherSharedsOfAuthenticatedUser(){
        var result = sharedService.getAllPublishedAndPublisherSharedsOfAuthenticatedUser();

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @PostMapping("/addShared")
    public ResponseEntity<?> addShared(@RequestBody SharedAddDto sharedAddDto) {

        List<String> phoneNumbers = sharedAddDto.getPhoneNumbers();

        List<Result> results = new ArrayList<>();

        for (String phoneNumber : phoneNumbers) {
            User publishedUser = User.builder()
                    .phoneNumber(phoneNumber)
                    .build();

            Shared shared = Shared.builder()
                    .published(publishedUser)
                    .shareEndTime(sharedAddDto.getShareEndTime())
                    .shareType(sharedAddDto.getShareType())
                    .build();

            var result = sharedService.addShared(shared);
            results.add(result);
        }

        return ResponseEntity.ok(results);
    }


    @PostMapping("/acceptShared/{sharedId}")
    public ResponseEntity<?> acceptShared(@PathVariable UUID sharedId){
        var result = sharedService.acceptShared(sharedId);

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }


}
