package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.product.DateType;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ProductPriceRepo extends JpaRepository<ProductPrice, Long> {

   //선택 업태의 품목 가격 정보
    List<ProductPrice> findByProductAndBusinessAndDateTypeAndResearchDateBetweenOrderByResearchDate(
            Product product, BusinessType business, DateType dateType, LocalDate start, LocalDate end);

    List<ProductPrice> findByProductAndDateTypeOrderByResearchDate(Product product, DateType dateType);
}
