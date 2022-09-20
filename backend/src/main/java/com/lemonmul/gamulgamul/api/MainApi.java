package com.lemonmul.gamulgamul.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
@Slf4j
public class MainApi {

    /**
    * 메인페이지 정보 조회
    * TODO: JWT 까서 user 있으면 이름 정보 보내주고, 아니면 user에 empty 정보 log
    * TODO: 국가 지수, 공통 지수, 즐겨찾기 지수(user 없을 경우 얘도 empty)
    * TODO: 체크리스트가 생길 경우 체크리스트 id (3개였으면 좋겠다) log
    * TODO: 기사가 들어갈 경우는 추후 논의
    */

}
