package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductPriceRepo extends JpaRepository<ProductPrice, Long> {
    List<ProductPrice> findAllByProductAndDtype(Product product, String dtype);
}
