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


    // 초 분 시간 일 월 요일(0, 7이 일이욜)
    @Scheduled(cron = "0 0/5 5 * * *")
    public void renewNews(){
        final long startTime = System.currentTimeMillis();
        log.info("[Starting request]");
        mainService.apiProcess();
        final long endTime = System.currentTimeMillis();
        log.info("[Finished request]: {} millis", (endTime - startTime));
    }

}
