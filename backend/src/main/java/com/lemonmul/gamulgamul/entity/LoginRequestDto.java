package com.lemonmul.gamulgamul.entity;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class LoginRequestDto {
	private String email;
	private String pwd;
}
