package com.lemonmul.gamulgamul.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogoutRequestDto {
    @Email
    private String email;
}
