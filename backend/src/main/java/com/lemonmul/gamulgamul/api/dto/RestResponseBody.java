package com.lemonmul.gamulgamul.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class RestResponseBody {
    private String code;
    private List<RestResponseMsg> msg;
}
