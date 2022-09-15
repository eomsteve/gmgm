package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.User;
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
    public boolean emailCheck(String email) {
        return userRepo.findByEmail(email).isEmpty();
    }

    // TODO: 강의 듣고 예외처리 해야함
    @Transactional
    public boolean signUp(User user) {
        userRepo.save(user);

        return true;
    }
}
