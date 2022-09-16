package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.priceindex.CountryIndex;
import com.lemonmul.gamulgamul.entity.priceindex.GMGMIndex;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.repo.PriceIndexRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PriceIndexService {

    private final PriceIndexRepo priceIndexRepo;

    // 지정한 날부터 1달 간격으로 국가 지수나 공통 지수를 받아오는 함수
    public List<PriceIndex> getIndices(String dtype, LocalDate date) {
        return priceIndexRepo.findAllByDtypeAndResearchDateBetween(dtype, date.minusYears(1), date);
    }

    // 지정한 날부터 1달 간격으로 즐겨찾기 지수를 받아오는 함수
    public List<PriceIndex> getFavoriteIndices(Long userId, LocalDate date) {
        return priceIndexRepo.findAllByDtypeAndUserIdAndResearchDateBetween("f", userId, date.minusYears(1), date);
    }

    // 지수 정보를 추가하는 함수(즐겨찾기 지수 제외)
    // 아마 나중에 삭제할 듯...?
    @Transactional
    public boolean addIndex(String dtype, String date, double value) {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        PriceIndex priceIndex = null;

        if("c".equals(dtype))
            priceIndex = CountryIndex.createCountryIndex(localDate, value);
        else if("g".equals(dtype))
            priceIndex = GMGMIndex.createGMGMIndex(localDate, value);

        priceIndexRepo.save(priceIndex);

        return true;
    }
}
