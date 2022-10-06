package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.FavoriteTotalPriceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FavoriteTotalPriceService {

    private final FavoriteTotalPriceRepo favoriteTotalPriceRepo;

    /**
     * 사용자, 업태, 날짜를 기준으로 1년치 즐겨찾기 총합 리스트는 받아오는 함수
     */
    public List<FavoriteTotalPrice> getFavoriteTotalPrices(User user, BusinessType business, LocalDate date) {
        return favoriteTotalPriceRepo.findAllByUserAndBusinessAndResearchDateBetweenOrderByResearchDate(user, business, date.minusYears(1), date);
    }

    /**
     * 사용자, 날짜를 기준으로 1년치 즐겨찾기 총합 리스트는 받아오는 함수
     */
    public List<FavoriteTotalPrice> getAllFavoriteTotalPrices(User user, LocalDate date) {
        return favoriteTotalPriceRepo.findAllByUserAndResearchDateBetweenOrderByResearchDate(user, date.minusYears(1), date);
    }

    /**
     * 입력으로 들어온 리스트를 저장하는 함수
     */
    @Transactional
    public List<FavoriteTotalPrice> addAll(List<FavoriteTotalPrice> favoriteTotalPrices) {
        return favoriteTotalPriceRepo.saveAll(favoriteTotalPrices);
    }

    /**
     * 사용자의 즐겨찾기 총합을 전부 삭제하는 함수
     */
    @Transactional
    public void deleteFavoriteTotalPrice(User user) {
        favoriteTotalPriceRepo.deleteByUser(user);
    }
}
