package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.product.DateType;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import com.lemonmul.gamulgamul.repo.ProductPriceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductPriceService {

    private final ProductPriceRepo productPriceRepo;

    public List<ProductPrice> productPricesFor1yearByBusiness(Product product, BusinessType businessType){
        LocalDate today = LocalDate.now();
        return productPriceRepo.findByProductAndBusinessAndDateTypeAndResearchDateBetweenOrderByResearchDate(
                product,businessType,DateType.d, today.minusYears(1), today);
    }
}
