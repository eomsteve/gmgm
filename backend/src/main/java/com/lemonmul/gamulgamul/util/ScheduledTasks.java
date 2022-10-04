package com.lemonmul.gamulgamul.util;

import com.lemonmul.gamulgamul.service.AddNewDataService;
import com.lemonmul.gamulgamul.service.MainService;
import com.lemonmul.gamulgamul.service.PriceGapService;
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
    private final PriceGapService priceGapService;
    private final AddNewDataService addNewDataService;

    /**
     * Naver News API 검색 스케줄링
     *  한시간마다 갱신
     * */
    @Scheduled(cron = "0 */1 * * * *")
    public void renewNews(){
        final long startTime = System.currentTimeMillis();
        log.info("[Starting request] request to Naver API");
        mainService.apiProcess();
        final long endTime = System.currentTimeMillis();
        log.info("[Finished request]: {} millis", (endTime - startTime));
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void renewPriceGap() {
        priceGapService.renewPriceGap();
    }

    @Scheduled(cron = "0 30 23 * * *")
    public void addNewData() {
        addNewDataService.addNewData();
    }
}
