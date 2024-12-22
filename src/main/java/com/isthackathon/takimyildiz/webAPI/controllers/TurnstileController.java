package com.isthackathon.takimyildiz.webAPI.controllers;

import com.isthackathon.takimyildiz.business.abstracts.SharedService;
import com.isthackathon.takimyildiz.business.abstracts.TurnstileService;
import com.isthackathon.takimyildiz.business.abstracts.UserService;
import com.isthackathon.takimyildiz.core.results.DataResult;
import com.isthackathon.takimyildiz.webAPI.dtos.turnstiles.PassCardDto;
import com.isthackathon.takimyildiz.webAPI.dtos.turnstiles.SharedUserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/turnstiles")
public class TurnstileController {

    private final TurnstileService turnstileService;

    public TurnstileController(TurnstileService turnstileService, SharedService sharedService) {
        this.turnstileService = turnstileService;
    }

    @GetMapping("/getTurnstilesOfAuthenticatedUser")
    public ResponseEntity<?> getTurnstilesOfAuthenticatedUser() {
        var result = turnstileService.getTurnstilesOfAuthenticatedUser();
        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @PostMapping("/passCard")
    public ResponseEntity<?> passCard(@RequestBody PassCardDto passCardDto) {
        var result = turnstileService.passCard(passCardDto.getVehicleCode(), passCardDto.getCardId(), passCardDto.getLineCode());
        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @PostMapping("/leaveVehicle/{vehicleCode}")
    public ResponseEntity<?> leaveVehicle(@PathVariable String vehicleCode) {
        var result = turnstileService.leaveVehicle(vehicleCode);
        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @GetMapping("/sharedTurnstiles/{publisherId}")
    public ResponseEntity<DataResult<?>> getSharedTurnstiles(@PathVariable UUID publisherId) {
        var result = turnstileService.getSharedTurnstiles(publisherId);
        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }
}
