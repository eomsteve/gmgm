package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Long> {

}
