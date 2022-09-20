package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import com.lemonmul.gamulgamul.entity.product.WeekProductPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductPriceRepo extends JpaRepository<ProductPrice, Long> {

    //선택 업태의 품목 가격 정보
    @Query("from WeekProductPrice")
    List<ProductPrice> findByProductAndBusinessType(Product product, BusinessType businessType);

    List<ProductPrice> findAllByProductAndDtype(Product product, String dtype);
}
