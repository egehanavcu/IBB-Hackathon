package com.isthackathon.takimyildiz.webAPI.dtos.turnstiles;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PassCardDto {

    private String vehicleCode;

    private String cardId;

    private String lineCode;

}
