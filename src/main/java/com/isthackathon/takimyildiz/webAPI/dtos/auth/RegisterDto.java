package com.isthackathon.takimyildiz.webAPI.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterDto {

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String password;


}
