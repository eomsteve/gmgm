package com.lemonmul.gamulgamul.util;

import com.lemonmul.gamulgamul.service.MainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@RequiredArgsConstructor
@Slf4j
public class ScheduledTasks {

    private final MainService mainService;

    /**
     * Naver News API 검색 스케줄링
     * 매 4시, 12시, 20시에 갱신
     * */
    @Scheduled(cron = "0 0 3/8 * * *")
    public void renewNews(){
        final long startTime = System.currentTimeMillis();
        log.info("[Starting request] request to Naver API");
        mainService.apiProcess();
        final long endTime = System.currentTimeMillis();
        log.info("[Finished request]: {} millis", (endTime - startTime));
    }

}
