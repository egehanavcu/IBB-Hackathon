package com.isthackathon.takimyildiz.webAPI.dtos.shareds;

import com.isthackathon.takimyildiz.entities.ShareType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SharedAddDto {

    private UUID publishedId;

    private LocalDateTime shareStartTime;

    private LocalDateTime shareEndTime;

    private ShareType shareType;



}
