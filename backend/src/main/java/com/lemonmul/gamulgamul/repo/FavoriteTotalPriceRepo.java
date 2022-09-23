package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.favorite.FavoriteTotalPrice;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FavoriteTotalPriceRepo extends JpaRepository<FavoriteTotalPrice, Long> {
    List<FavoriteTotalPrice> findAllByUserAndBusinessAndResearchDateBetweenOrderByResearchDate(User user, BusinessType businessType, LocalDate start, LocalDate end);

    @Modifying
    @Query("delete from FavoriteTotalPrice where user=:user")
    void deleteByUser(@Param("user") User user);
}
