package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductPriceRepo extends JpaRepository<ProductPrice, Long> {

   //선택 업태의 품목 가격 정보
    List<ProductPrice> findByProductAndBusinessOrderByResearchDate(Product product,BusinessType business);
}
