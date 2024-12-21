package com.isthackathon.takimyildiz.webAPI.dtos.schedules;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddScheduleDto {

    private UUID childId;

    private LocalDate day;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private UUID enterStopId;

    private UUID leaveStopId;

    private String lineCode;


}
