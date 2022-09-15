package com.lemonmul.gamulgamul.security.jwt;

public interface JwtProperties {
    // TODO: secret key 값 정해야함
    String SECRET = "gamulgamul";
    long EXPIRATION_TIME = 1440 * 60 * 1000L; // 1440분 = 24시간
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
