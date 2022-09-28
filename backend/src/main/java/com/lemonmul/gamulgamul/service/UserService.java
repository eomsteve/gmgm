package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;

    // TODO: 강의 듣고 예외처리 해야함
    public User emailCheck(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    // TODO: 강의 듣고 예외처리 해야함
    @Transactional
    public User signUp(User user) {
        return userRepo.save(user);
    }

    // TODO: 강의 듣고 예외처리 해야함
    public User getUserInfoByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow();
    }
}
