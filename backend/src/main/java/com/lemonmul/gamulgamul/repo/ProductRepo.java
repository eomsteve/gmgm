package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Long> {

    @Query(value = "select * from product where product_id in :ids order by field(product_id, :ids)",nativeQuery = true)
    List<Product> findByIdIn(@Param("ids") List<Long> ids);
}
