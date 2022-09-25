package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.priceindex.IndexType;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PriceIndexRepo extends JpaRepository<PriceIndex, Long> {
    List<PriceIndex> findAllByIndexTypeAndResearchDateBetweenOrderByResearchDate(IndexType indexType, LocalDate start, LocalDate end);

    List<PriceIndex> findAllByUserAndIndexTypeAndResearchDateBetweenOrderByResearchDate(User user, IndexType indexType, LocalDate start, LocalDate end);

    PriceIndex findTopByIndexTypeOrderByResearchDateDesc(IndexType indexType);

    PriceIndex findTopByUserAndIndexTypeOrderByResearchDateDesc(User user, IndexType indexType);

    @Modifying
    @Query("delete from PriceIndex where user=:user and indexType=:indexType")
    void deleteByUserAndIndexType(@Param("user") User user, @Param("indexType") IndexType indexType);
}
