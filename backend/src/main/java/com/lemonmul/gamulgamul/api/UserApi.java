package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.user.LogoutRequestDto;
import com.lemonmul.gamulgamul.api.dto.user.SignupRequestDto;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.security.redis.RedisService;
import com.lemonmul.gamulgamul.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class UserApi {
    // TODO: 시간 날 때 컨트롤러, 서비스 주석 달기

    private final UserService userService;
    private final RedisService redisService;

    /**
     * 이메일 중복 여부 체크
     */
    // TODO: 강의 듣고 예외처리 해야함
    @GetMapping("/check/{email}")
    public boolean emailCheck(@PathVariable String email) {
        log.info("[Starting request] GET /user/check/{}", email);

        log.info("email: {}", email);

        User findUser = userService.emailCheck(email);
        log.info("findUser: {}", findUser);

        log.info("[Finished request] GET /user/check/{}", email);
        return findUser == null;
    }

    /**
     * 회원가입
     */
    // TODO: 강의 듣고 예외처리 해야함
    @PostMapping("/signup")
    public boolean signUp(@RequestBody SignupRequestDto signupRequestDto) {
        log.info("[Starting request] POST /user/signup");

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

        User signUpUser = userService.signUp(signupRequestDto.toUser());

        log.info("[Finished request] POST /user/signup");
        return signUpUser != null;
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
     * 로그아웃
     */
	@PostMapping("/logout")
	public boolean logout(@RequestBody LogoutRequestDto logoutRequestDto) {
        log.info("[Starting request] POST /user/logout");

        log.info("email: {}", logoutRequestDto.getEmail());
        redisService.deleteValues(logoutRequestDto.getEmail());

        log.info("[Finished request] POST /user/logout");
        return true;
	}

    @Data
    @AllArgsConstructor
    private static class UpdateRequestDto {

    }

    @Data
    @AllArgsConstructor
    private static class UpdateResponseDto {

    }
}
