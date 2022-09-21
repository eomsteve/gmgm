package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.EmailResponseDto;
import com.lemonmul.gamulgamul.api.dto.user.SignupRequestDto;
import com.lemonmul.gamulgamul.entity.user.Gender;
import com.lemonmul.gamulgamul.entity.user.Role;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
public class UserApi {
    // TODO: 시간 날 때 컨트롤러, 서비스 주석 달기

    private final UserService userService;

    // TODO: 강의 듣고 예외처리 해야함
    // TODO: email log 찍기
    @GetMapping("/check/{email}")
    public EmailResponseDto emailCheck(@PathVariable String email) {
        log.info("Starting request");

        log.info("email: {}", email);

        log.info("Finished request");
        return new EmailResponseDto(userService.emailCheck(email).getEmail());
    }

    // TODO: 강의 듣고 예외처리 해야함
    // TODO: pwd는 다 ***, name은 홍*동, 나머지는 그대로 log
    @PostMapping("/signup")
    public EmailResponseDto signUp(@RequestBody SignupRequestDto signupRequestDto) {
        log.info("Starting request");

        log.info("email: {}", signupRequestDto.getEmail());
        log.info("pwd: {}", signupRequestDto.getPwd().replaceAll(".", "*"));
        StringBuilder logName = new StringBuilder(signupRequestDto.getName().replaceAll(".", "*"));
        logName.setCharAt(0, signupRequestDto.getName().charAt(0));
        logName.setLength(logName.length() - 1);
        logName.append(signupRequestDto.getName().charAt(signupRequestDto.getName().length() - 1));
        log.info("name: {}", logName);
        log.info("gender: {}", signupRequestDto.getGender());
        log.info("birthday: {}", signupRequestDto.getBirthday());
        log.info("role: {}", signupRequestDto.getRole());

        log.info("Finished request");
        return new EmailResponseDto(userService.signUp(signupRequestDto.toUser()).getEmail());
    }

    // TODO: JWT 에서 email 까서  log
//	@DeleteMapping("/")
//	public boolean delete(@PathVariable Long userId) {
//
//	}

    /**
     * TODO: 수정 할 수 있는 정보 종류 정해서 Dto에 추가하기
     */
    // TODO: name은 홍*동, 나머지는 그대로 log
//	@PutMapping("/update")
//	public boolean update(@RequestBody UpdateRequestDto updateRequestDto) {
//
//	}

    /**
     * TODO: 수정할 수 있는 정보 종류 정해서 Dto에 추가하기
     */
//	@GetMapping("/update")
//	public UpdateResponseDto getInfo(@PathVariable Long userId) {
//
//	}

    /**
     * TODO: JWT는 기본적으로 서버에서 로그아웃 시킬 수 없음
     * 		-> 토큰의 유효기간을 바꿀 수 없기 때문
     * 		그래서 주로 토큰 시간을 아주 짧게(5분 정도) 설정하는 방법과
     * 		redis로 토큰 블랙리스트를 만드는 방법이 있는 것 같음
     * 		-> 어느 쪽으로 하든 지금 상황에서 refresh 토큰은 추가로 구현해야 할 것 같음
     */
    // TODO: JWT 까서 email log
//	@GetMapping("/logout")
//	public boolean logout() {
//
//	}

    @Data
    @AllArgsConstructor
    private static class UpdateRequestDto {

    }

    @Data
    @AllArgsConstructor
    private static class UpdateResponseDto {

    }
}
