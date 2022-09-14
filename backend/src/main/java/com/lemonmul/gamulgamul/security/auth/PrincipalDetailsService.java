package com.lemonmul.gamulgamul.security.auth;

import com.lemonmul.gamulgamul.entity.User;
import com.lemonmul.gamulgamul.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService{

	private final UserRepo userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO: 강의 듣고 예외처리 해야함
		User user = userRepo.findByEmail(email).orElseThrow();

		return new PrincipalDetails(user);
	}
}
