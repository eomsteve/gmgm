package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.priceindex.IndexType;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PriceIndexRepo extends JpaRepository<PriceIndex, Long> {
    List<PriceIndex> findAllByIndexTypeAndResearchDateBetweenOrderByResearchDate(IndexType indexType, LocalDate start, LocalDate end);

    List<PriceIndex> findAllByUserAndIndexTypeAndResearchDateBetweenOrderByResearchDate(User user, IndexType indexType, LocalDate start, LocalDate end);

    void deleteByUserAndIndexType(User user, IndexType indexType);
}
