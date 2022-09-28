package com.lemonmul.gamulgamul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GamulgamulApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamulgamulApplication.class, args);
    }

}
