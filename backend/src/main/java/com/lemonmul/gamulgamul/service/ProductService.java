package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepo productRepo;

    public Product getProductById(Long productId) {
        return productRepo.findById(productId).get();
    }
}
