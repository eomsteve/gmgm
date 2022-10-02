package com.lemonmul.gamulgamul.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemonmul.gamulgamul.api.dto.user.LoginRequestDto;
import com.lemonmul.gamulgamul.api.dto.user.LoginResponseDto;
import com.lemonmul.gamulgamul.security.auth.PrincipalDetails;
import com.lemonmul.gamulgamul.security.redis.RedisService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Objects;

public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final AuthenticationManager authenticationManager;
    private final RedisService redisService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, RedisService redisService) {
        super(new AntPathRequestMatcher("/user/login"));
        this.authenticationManager = authenticationManager;
        this.redisService = redisService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        // TODO: 강의 듣고 예외처리 다시 해야함
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }

        ObjectMapper om = new ObjectMapper();
        LoginRequestDto loginRequestDto = null;
        try {
            loginRequestDto = om.readValue(request.getInputStream(), LoginRequestDto.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        Objects.requireNonNull(loginRequestDto).getEmail(),
                        loginRequestDto.getPwd());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException {

        ObjectMapper ob = new ObjectMapper();

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        String accessToken = JwtTokenProvider.createToken(principalDetails, JwtProperties.ACCESS_EXPIRATION_TIME);
        accessToken = JwtProperties.TOKEN_PREFIX + accessToken;

        String refreshToken = JwtTokenProvider.createToken(principalDetails, JwtProperties.REFRESH_EXPIRATION_TIME);
        refreshToken = JwtProperties.TOKEN_PREFIX + refreshToken;
        redisService.setValues(principalDetails.getUsername(), refreshToken, Duration.ofMillis(JwtProperties.REFRESH_EXPIRATION_TIME));

        LoginResponseDto loginResponseDto = new LoginResponseDto(accessToken, refreshToken);
        String loginResponse = ob.writeValueAsString(loginResponseDto);

        response.getWriter().write(loginResponse);
    }
}
