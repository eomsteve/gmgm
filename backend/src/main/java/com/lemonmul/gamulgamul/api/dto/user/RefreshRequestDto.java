package com.lemonmul.gamulgamul.api.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RefreshRequestDto {
    private String email;

    private String refreshToken;
}
