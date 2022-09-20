package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FavoriteTotalPriceRepo extends JpaRepository<FavoriteTotalPrice, Long> {
    List<FavoriteTotalPrice> findAllByUserIdAndBusinessTypeAndResearchDateBetween(User user, BusinessType businessType, LocalDate start, LocalDate end);
}
