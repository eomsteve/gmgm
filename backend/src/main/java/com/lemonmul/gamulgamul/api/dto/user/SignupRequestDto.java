package com.lemonmul.gamulgamul.api.dto.user;

import com.lemonmul.gamulgamul.entity.user.Gender;
import com.lemonmul.gamulgamul.entity.user.Role;
import com.lemonmul.gamulgamul.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {
    @Email
    @NotEmpty
    private String email;

    // 8자 이상 ~ 15자 이하, 영어 소문자, 숫자, 특수문자(!@#$%^*+=-?_~) 1개 이상
    @NotEmpty
    private String pwd;

    // 1자 이상 ~ 12자 미만
    @NotEmpty
    private String name;

    @NotNull
    private Gender gender;

    @NotNull
    private LocalDate birthday;

    @NotNull
    private Role role;

    public User toUser() {
        // TODO: @Bean으로 등록된 걸 가져오고 싶은데 방법을 모르겠음
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        pwd = bCryptPasswordEncoder.encode(pwd);

        return User.of(email, pwd, name, gender, birthday, role);
    }
}
