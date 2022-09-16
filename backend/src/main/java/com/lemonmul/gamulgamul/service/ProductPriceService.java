package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import com.lemonmul.gamulgamul.repo.ProductPriceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductPriceService {

    private final ProductPriceRepo productPriceRepo;

    public List<ProductPrice> getMonthProductPrice(Product product) {
        return productPriceRepo.findAllByProductAndDtype(product, "m");
    }
}
