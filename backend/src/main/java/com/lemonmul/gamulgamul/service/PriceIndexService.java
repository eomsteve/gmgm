package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.priceindex.IndexType;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.PriceIndexRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PriceIndexService {

    private final PriceIndexRepo priceIndexRepo;

    // 지정한 날부터 1달 간격으로 국가 지수나 공통 지수를 받아오는 함수
    public List<PriceIndex> getIndices(IndexType indexType, LocalDate date) {
        return priceIndexRepo.findAllByIndexTypeAndResearchDateBetweenOrderByResearchDate(indexType, date.minusYears(1), date);
    }

    // 지정한 날부터 1달 간격으로 즐겨찾기 지수를 받아오는 함수
    public List<PriceIndex> getFavoriteIndices(User user, LocalDate date) {
        return priceIndexRepo.findAllByUserAndIndexTypeAndResearchDateBetweenOrderByResearchDate(user, IndexType.f, date.minusYears(1), date);
    }

    @Transactional
    public List<PriceIndex> updateFavoriteIndex(User user, List<PriceIndex> priceIndices) {
        priceIndexRepo.deleteByUserAndIndexType(user, IndexType.f);
        return priceIndexRepo.saveAll(priceIndices);
    }
}
