package com.isthackathon.takimyildiz.webAPI.controllers;

import com.isthackathon.takimyildiz.business.abstracts.SharedService;
import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.entities.Shared;
import com.isthackathon.takimyildiz.entities.Turnstile;
import com.isthackathon.takimyildiz.entities.User;
import com.isthackathon.takimyildiz.webAPI.dtos.shareds.SharedAddDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<DataResult<List<Shared>>> getAllSharedsOfAuthenticatedUser(){
        var result = sharedService.getAllSharedsOfAuthenticatedUser();

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @PostMapping("/addShared")
    public ResponseEntity<?> addShared(@RequestBody SharedAddDto sharedAddDto){
        User publishedUser = User.builder()
                .id(sharedAddDto.getPublishedId())
                .build();


        Shared shared = Shared.builder()
                .published(publishedUser)
                .shareStartTime(sharedAddDto.getShareStartTime())
                .shareEndTime(sharedAddDto.getShareEndTime())
                .shareType(sharedAddDto.getShareType())
                .build();

        var result = sharedService.addShared(shared);

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @PostMapping("/acceptShared/{sharedId}")
    public ResponseEntity<?> acceptShared(@PathVariable UUID sharedId){
        var result = sharedService.acceptShared(sharedId);

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }


}
