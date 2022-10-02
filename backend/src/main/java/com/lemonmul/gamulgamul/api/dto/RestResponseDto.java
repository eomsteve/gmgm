package com.lemonmul.gamulgamul.api.dto;

import lombok.Data;

@Data
public class RestResponseDto {
    private String status;
    private RestResponseBody body;
}
