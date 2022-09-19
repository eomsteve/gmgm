package com.lemonmul.gamulgamul.exhandler;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class ErrorResult {
    private LocalDateTime timestamp;
    private int status;
    private String error;
//    private String exception;
    private String message;
//    private String path;
}
