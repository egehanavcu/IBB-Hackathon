package com.isthackathon.takimyildiz.webAPI.dtos.turnstiles;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class SharedUserDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
