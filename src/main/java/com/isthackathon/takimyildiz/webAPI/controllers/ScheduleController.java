package com.isthackathon.takimyildiz.webAPI.controllers;

import com.isthackathon.takimyildiz.business.abstracts.ScheduleService;
import com.isthackathon.takimyildiz.core.results.Result;
import com.isthackathon.takimyildiz.entities.Line;
import com.isthackathon.takimyildiz.entities.LineStop;
import com.isthackathon.takimyildiz.entities.ParentSchedule;
import com.isthackathon.takimyildiz.entities.User;
import com.isthackathon.takimyildiz.webAPI.dtos.schedules.AddScheduleDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }


    @PostMapping("/addSchedule")
    public ResponseEntity<Result> addSchedule(@RequestBody AddScheduleDto addScheduleDto){

        User child = User.builder()
                .id(addScheduleDto.getChildId())
                .build();

        LineStop enterStop = LineStop.builder()
                .id(addScheduleDto.getEnterStopId())
                .build();

        LineStop exitStop = LineStop.builder()
                .id(addScheduleDto.getLeaveStopId())
                .build();

        Line line = Line.builder()
                .lineCode(addScheduleDto.getLineCode())
                .build();

        ParentSchedule parentSchedule = ParentSchedule.builder()
                .child(child)
                .day(addScheduleDto.getDay())
                .startTime(addScheduleDto.getStartTime())
                .endTime(addScheduleDto.getEndTime())
                .enterStop(enterStop)
                .leaveStop(exitStop)
                .line(line)
                .build();



        var result = scheduleService.addSchedule(parentSchedule);

        return ResponseEntity.status(result.getHttpStatus()).body(result);
    }

    @GetMapping("/getSchedulesOfAuthenticatedParent")
    public ResponseEntity<?> getSchedulesOfAuthenticatedParent(){
        var result = scheduleService.getSchedulesOfAuthenticatedParent();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getSchedulesOfAuthenticatedChild")
    public ResponseEntity<?> getSchedulesOfAuthenticatedChild(){
        var result = scheduleService.getSchedulesOfAuthenticatedChild();
        return ResponseEntity.ok(result);
    }
}
