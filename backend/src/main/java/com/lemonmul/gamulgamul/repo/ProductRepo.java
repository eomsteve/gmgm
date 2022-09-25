package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Long> {

    List<Product> findByIdIn(List<Long> ids);
}
