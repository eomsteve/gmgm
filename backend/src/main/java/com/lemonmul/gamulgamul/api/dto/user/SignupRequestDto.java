package com.lemonmul.gamulgamul.api.dto.user;

import com.lemonmul.gamulgamul.entity.user.Gender;
import com.lemonmul.gamulgamul.entity.user.Role;
import com.lemonmul.gamulgamul.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
public class SignupRequestDto {
    private String email;

    private String pwd;

    private String name;

    private String gender;

    private String birthday;

    private String role;

    public User toUser() {
        // TODO: @Bean으로 등록된 걸 가져오고 싶은데 방법을 모르겠음
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        Gender genderEnum = Gender.valueOf(gender);
        LocalDate localDate = LocalDate.parse(birthday, DateTimeFormatter.ISO_DATE);
        Role roleEnum = Role.valueOf(role);

        pwd = bCryptPasswordEncoder.encode(pwd);

        return User.of(email, pwd, name, genderEnum, localDate, roleEnum);
    }
}
