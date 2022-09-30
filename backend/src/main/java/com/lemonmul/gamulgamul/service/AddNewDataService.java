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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class AddNewDataService {
    private final ProductRepo productRepo;
    private final GoodsRepo goodsRepo;
    private final ProductPriceRepo productPriceRepo;
    private final GoodsPriceRepo goodsPriceRepo;

    public void addNewData() {
        RestTemplate restTemplate = new RestTemplate();

        String url = "http://3.36.106.26:8081/api/notebook/run/2HFD439YZ/paragraph_1663724866932_1303867911";
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<?> requestMessage = new HttpEntity<>(httpHeaders);

        HttpEntity<String> response = restTemplate.postForEntity(url, requestMessage, String.class);

        LocalDate today = LocalDate.now();

        List<ProductPrice> recentProductPricesOff = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today, BusinessType.m);
        List<ProductPrice> recentProductPricesOn = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today, BusinessType.o);

        List<Product> products = productRepo.findAll();
        for(int i = 0; i < products.size(); i++) {
            products.get(i).setPriceGapOff(recentProductPricesOff.get(i).getPrice());
            products.get(i).setPriceGapOn(recentProductPricesOn.get(i).getPrice());
        }

        List<GoodsPrice> recentGoodsPricesOff = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today, BusinessType.m);
        List<GoodsPrice> recentGoodsPricesOn = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today, BusinessType.o);

        List<Goods> goodsList = goodsRepo.findAll();
        for(int i = 0; i < goodsList.size(); i++) {
            goodsList.get(i).setPriceGapOff(recentGoodsPricesOff.get(i).getPrice());
            goodsList.get(i).setPriceGapOn(recentGoodsPricesOn.get(i).getPrice());
        }
    }
}
