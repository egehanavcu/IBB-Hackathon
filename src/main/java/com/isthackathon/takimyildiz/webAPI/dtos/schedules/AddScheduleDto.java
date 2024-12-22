package com.isthackathon.takimyildiz.webAPI.dtos.schedules;

import com.isthackathon.takimyildiz.entities.Days;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddScheduleDto {

    private UUID childId;

    private Set<Days> days;

    private LocalTime startTime;

    private LocalTime endTime;

    private UUID enterStopId;

    private UUID leaveStopId;

    private String lineCode;


}
