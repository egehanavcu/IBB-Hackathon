package com.isthackathon.takimyildiz.webAPI.controllers;

import com.isthackathon.takimyildiz.business.abstracts.LineService;
import com.isthackathon.takimyildiz.core.results.DataResult;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lines")
public class LineController {

    private final LineService lineService;

    public LineController(LineService lineService) {
        this.lineService = lineService;
    }



    @GetMapping("/getLineByCode")
    public ResponseEntity<DataResult<?>> getLineByCode(@RequestParam String lineCode){
        var result = lineService.getLineByCode(lineCode);

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @GetMapping("/getAllLines")
    public ResponseEntity<DataResult<?>> getAllLines(){
        var result = lineService.getAllLines();

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }
}
