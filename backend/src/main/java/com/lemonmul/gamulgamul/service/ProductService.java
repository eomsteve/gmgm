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
        Optional<Product> optional = productRepo.findById(productId);
        if(optional.isPresent()){
            return optional.get();
        }else{
            //todo 더 적절한 예외 있으면 바꾸기, 아니면 사용자 예외 만들기
            throw new IllegalArgumentException();
        }
    }

    /**
     * 품목 리스트 조회
     */
    public List<Product> productList(List<Long> productIds){
        return productRepo.findByIdIn(productIds);
    }
}
