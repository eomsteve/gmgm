package com.lemonmul.gamulgamul.security.jwt;

import com.lemonmul.gamulgamul.security.auth.PrincipalDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtTokenProvider {

    public static String createToken(PrincipalDetails principalDetails) {
        Claims claims = Jwts.claims().setSubject(principalDetails.getUsername());
        claims.put("roles", principalDetails.getAuthorities());
        Date now = new Date();

        String jwtToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + JwtProperties.EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, JwtProperties.SECRET)
                .compact();

        return jwtToken;
    }

    public static String getEmail(String token) {
        return Jwts.parser().setSigningKey(JwtProperties.SECRET).parseClaimsJws(token).getBody().getSubject();
    }
}
