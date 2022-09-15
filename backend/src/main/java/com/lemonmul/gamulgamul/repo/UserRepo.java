package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
