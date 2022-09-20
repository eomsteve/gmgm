package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PriceIndexRepo extends JpaRepository<PriceIndex, Long> {
    List<PriceIndex> findAllByDtypeAndResearchDateBetweenOrderByResearchDate(String dtype, LocalDate start, LocalDate end);

    @Query("from FavoriteIndex order by researchDate")
    List<PriceIndex> findAllByUserAndResearchDateBetweenOrderByResearchDate(User user, LocalDate start, LocalDate end);

    @Modifying
    @Query("delete from FavoriteIndex")
    void deleteByUser(User user);
}
