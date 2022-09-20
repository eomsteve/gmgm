package com.lemonmul.gamulgamul.security.jwt;

import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.security.auth.PrincipalDetails;
import com.lemonmul.gamulgamul.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpHeaders;

import java.util.Date;

public class JwtTokenProvider {

    public static String createToken(PrincipalDetails principalDetails) {
        Claims claims = Jwts.claims().setSubject(principalDetails.getUsername());
        claims.put("roles", principalDetails.getAuthorities());
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + JwtProperties.EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, JwtProperties.SECRET)
                .compact();
    }

    public static String getEmail(String token) {
        return Jwts.parser().setSigningKey(JwtProperties.SECRET).parseClaimsJws(token).getBody().getSubject();
    }

    public static Long getUserIdFromJwtToken(UserService userService,HttpHeaders headers) {
        String token = headers.get(JwtProperties.HEADER_STRING).get(0).replace(JwtProperties.TOKEN_PREFIX, "");
        String email = JwtTokenProvider.getEmail(token);
        User user = userService.getUserInfoByEmail(email);
        return user.getId();
    }

    public static User getUserFromJwtToken(UserService userService,HttpHeaders headers) throws NullPointerException{
        String token = headers.get(JwtProperties.HEADER_STRING).get(0).replace(JwtProperties.TOKEN_PREFIX, "");
        String email = JwtTokenProvider.getEmail(token);
        return userService.getUserInfoByEmail(email);
    }
}
