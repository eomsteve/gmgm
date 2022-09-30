package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.entity.product.DateType;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.product.ProductPrice;
import com.lemonmul.gamulgamul.repo.GoodsPriceRepo;
import com.lemonmul.gamulgamul.repo.GoodsRepo;
import com.lemonmul.gamulgamul.repo.ProductPriceRepo;
import com.lemonmul.gamulgamul.repo.ProductRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@AllArgsConstructor
public class PriceGapService {
    private final ProductRepo productRepo;
    private final GoodsRepo goodsRepo;
    private final ProductPriceRepo productPriceRepo;
    private final GoodsPriceRepo goodsPriceRepo;

    /**
     * 품목/상품의 오프라인/온라인 가격차를 갱신하는 함수
     */
    @Transactional
    public void renewPriceGap() {
        LocalDate today = LocalDate.now();
        double priceGapOff, priceGapOn;

        List<ProductPrice> todayProductPricesOff = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today, BusinessType.m);
        List<ProductPrice> aWeekAgoProductPricesOff = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today.minusWeeks(1), BusinessType.m);
        List<ProductPrice> todayProductPricesOn = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today, BusinessType.o);
        List<ProductPrice> aWeekAgoProductPricesOn = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today.minusWeeks(1), BusinessType.o);

        Product product;
        List<Product> products = productRepo.findAll();
        for(int i = 0; i < products.size(); i++) {
            product = products.get(i);

            priceGapOff = aWeekAgoProductPricesOff.get(i).getPrice() - todayProductPricesOff.get(i).getPrice();
//            priceGapOn = aWeekAgoProductPricesOn.get(i).getPrice() - todayProductPricesOn.get(i).getPrice();

            product.setPriceGapOff(priceGapOff);
//            product.setPriceGapOn(priceGapOn);
        }

        List<GoodsPrice> todayGoodsPricesOff = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today, BusinessType.m);
        List<GoodsPrice> aWeekAgoGoodsPricesOff = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today.minusWeeks(1), BusinessType.m);
        List<GoodsPrice> todayGoodsPricesOn = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today, BusinessType.o);
        List<GoodsPrice> aWeekAgoGoodsPricesOn = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today.minusWeeks(1), BusinessType.o);

        Goods goods;
        List<Goods> goodsList = goodsRepo.findAll();
        for(int i = 0; i < goodsList.size(); i++) {
            goods = goodsList.get(i);

            priceGapOff = aWeekAgoGoodsPricesOff.get(i).getPrice() - todayGoodsPricesOff.get(i).getPrice();
//            priceGapOn = aWeekAgoGoodsPricesOn.get(i).getPrice() - todayGoodsPricesOn.get(i).getPrice();

            goods.setPriceGapOff(priceGapOff);
//            goods.setPriceGapOn(priceGapOn);
        }
    }
}
