package com.lemonmul.gamulgamul.security.jwt;

import com.lemonmul.gamulgamul.entity.User;
import com.lemonmul.gamulgamul.repo.UserRepo;
import com.lemonmul.gamulgamul.security.auth.PrincipalDetails;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter{
	
	private final UserRepo userRepo;

	@Autowired
	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepo userRepo) {
		super(authenticationManager);
		this.userRepo = userRepo;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String header = request.getHeader(JwtProperties.HEADER_STRING);
		if(header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
			chain.doFilter(request, response);
                        return;
		}

		String token = request.getHeader(JwtProperties.HEADER_STRING)
				.replace(JwtProperties.TOKEN_PREFIX, "");

		String username = Jwts.parser().setSigningKey(JwtProperties.SECRET).parseClaimsJws(token).getBody().getSubject();

		// TODO: 강의 듣고 예외처리 해야함
		if(username != null) {	
			User user = userRepo.findByEmail(username).orElseThrow();

			PrincipalDetails principalDetails = new PrincipalDetails(user);

			Authentication authentication =
					new UsernamePasswordAuthenticationToken(
							principalDetails,
							null,
							principalDetails.getAuthorities());
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
	
		chain.doFilter(request, response);
	}
	
}
