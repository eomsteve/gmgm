package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PriceIndexRepo extends JpaRepository<PriceIndex, Long> {
    List<PriceIndex> findAllByDtypeAndResearchDateBetween(String dtype, LocalDate start, LocalDate end);

    @Query("from FavoriteIndex")
    List<PriceIndex> findAllByDtypeAndUserIdAndResearchDateBetween(String dtype, User user, LocalDate start, LocalDate end);
}
