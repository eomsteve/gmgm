package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.repo.ChecklistRepo;
import com.lemonmul.gamulgamul.repo.PriceIndexRepo;
import com.lemonmul.gamulgamul.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class MainService {

    private final PriceIndexRepo priceIndexRepo;
    private final ChecklistRepo checklistRepo;

    public Double getIndex(String dtype, LocalDate date){
        priceIndexRepo.findAllByDtypeAndResearchDateBetweenOrderByResearchDate(dtype, date.minusMonths(2), date);
        return null;
    }
}
