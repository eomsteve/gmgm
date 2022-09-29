package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepo productRepo;

    /**
     * 품목 조회
     */
    public Product product(Long productId){
        return productRepo.findById(productId).orElseThrow(IllegalArgumentException::new);
    }
}
