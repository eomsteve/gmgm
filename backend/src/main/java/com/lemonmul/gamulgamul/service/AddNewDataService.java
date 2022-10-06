package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.api.dto.zeppelin.RestResponseDto;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
@Slf4j
public class AddNewDataService {
    private final ProductRepo productRepo;
    private final GoodsRepo goodsRepo;
    private final ProductPriceRepo productPriceRepo;
    private final GoodsPriceRepo goodsPriceRepo;

    public void addNewDataAM() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<?> requestMessage = new HttpEntity<>(httpHeaders);
        HttpEntity<RestResponseDto> response;

        List<String> urls = new ArrayList<>() {
            {
                add("http://3.36.106.26:8081/api/notebook/run/2HDSZ79TY/paragraph_1665044750036_1658200450");
                add("http://3.36.106.26:8081/api/notebook/run/2HG5D6PU3/paragraph_1664718865164_853671905");
                add("http://3.36.106.26:8081/api/notebook/run/2HGSN9FKX/paragraph_1663724866932_1303867911");
                add("http://3.36.106.26:8081/api/notebook/run/2HDBP6HA6/paragraph_1664257750778_1075879161");
                add("http://3.36.106.26:8081/api/notebook/run/2HE85V154/paragraph_1664338542808_392546995");
                add("http://3.36.106.26:8081/api/notebook/run/2HFEP1SVV/paragraph_1664852338546_377176280");
                add("http://3.36.106.26:8081/api/notebook/run/2HD9NBXQX/paragraph_1664179874437_1108003918");
                add("http://3.36.106.26:8081/api/notebook/run/2HG27A8KD/paragraph_1664245747441_340548848");
                add("http://3.36.106.26:8081/api/notebook/run/2HDR64PXZ/paragraph_1664289615264_120085320");
                add("http://3.36.106.26:8081/api/notebook/run/2HEUW4FMB/paragraph_1663754976707_2131716080");
            }
        };

        String url;
        for(int i = 0; i < urls.size(); i++) {
            url = urls.get(i);
            response = restTemplate.postForEntity(url, requestMessage, RestResponseDto.class);
            String code = Objects.requireNonNull(response.getBody()).getBody().getCode();
            log.info("response{} code: {}", i + 1, code);

            if(code.equals("ERROR")) {
                log.info("error occurred while using zeppelin");
                break;
            }
        }

        updateRecentPrice();
        updatePriceGap();
    }

    public void addNewDataPM() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<?> requestMessage = new HttpEntity<>(httpHeaders);
        HttpEntity<RestResponseDto> response;

        List<String> urls = new ArrayList<>() {
            {
                add("http://3.36.106.26:8081/api/notebook/run/2HDSZ79TY/paragraph_1665044750036_1658200450");
                add("http://3.36.106.26:8081/api/notebook/run/2HG5D6PU3/paragraph_1664718865164_853671905");
                add("http://3.36.106.26:8081/api/notebook/run/2HDHVH62E/paragraph_1664863840860_1055396381");
                add("http://3.36.106.26:8081/api/notebook/run/2HGTXCVUK/paragraph_1664889296623_1087566984");
                add("http://3.36.106.26:8081/api/notebook/run/2HEQFFR9T/paragraph_1664893461293_1891832349");
            }
        };

        String url;
        for(int i = 0; i < urls.size(); i++) {
            url = urls.get(i);
            response = restTemplate.postForEntity(url, requestMessage, RestResponseDto.class);
            String code = Objects.requireNonNull(response.getBody()).getBody().getCode();
            log.info("response{} code: {}", i + 1, code);

            if(code.equals("ERROR")) {
                log.info("error occurred while using zeppelin");
                break;
            }
        }

        updateRecentPrice();
        updatePriceGap();
    }

    public void updateRecentPrice() {
        LocalDate today = LocalDate.now();

        List<ProductPrice> recentProductPricesOff = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today, BusinessType.m);
        List<ProductPrice> recentProductPricesOn = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today, BusinessType.o);

        List<Product> products = productRepo.findAll();
        for(int i = 0; i < products.size(); i++) {
            products.get(i).setRecentPriceOff(recentProductPricesOff.get(i).getPrice());
            products.get(i).setRecentPriceOn(recentProductPricesOn.get(i).getPrice());
        }

        List<GoodsPrice> recentGoodsPricesOff = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today, BusinessType.m);
        List<GoodsPrice> recentGoodsPricesOn = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today, BusinessType.o);

        List<Goods> goodsList = goodsRepo.findAll();
        for(int i = 0; i < goodsList.size(); i++) {
            goodsList.get(i).setRecentPriceOff(recentGoodsPricesOff.get(i).getPrice());
            goodsList.get(i).setRecentPriceOn(recentGoodsPricesOn.get(i).getPrice());
        }
    }

    public void updatePriceGap() {
        LocalDate today = LocalDate.now();
        double priceGapOff, priceGapOn;

        List<ProductPrice> todayProductPricesOff = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today, BusinessType.m);
        List<ProductPrice> twoWeekAgoProductPricesOff = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today.minusWeeks(2), BusinessType.m);
        List<ProductPrice> todayProductPricesOn = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today, BusinessType.o);
        List<ProductPrice> twoWeekAgoProductPricesOn = productPriceRepo.findByDateTypeAndResearchDateAndBusinessOrderByProduct(DateType.d, today.minusWeeks(2), BusinessType.o);

        Product product;
        List<Product> products = productRepo.findAll();
        for(int i = 0; i < products.size(); i++) {
            product = products.get(i);

            priceGapOff = Math.round(todayProductPricesOff.get(i).getPrice() - twoWeekAgoProductPricesOff.get(i).getPrice());
            priceGapOn = Math.round(todayProductPricesOn.get(i).getPrice() - twoWeekAgoProductPricesOn.get(i).getPrice());

            product.setPriceGapOff(priceGapOff);
            product.setPriceGapOn(priceGapOn);
        }

        List<GoodsPrice> todayGoodsPricesOff = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today, BusinessType.m);
        List<GoodsPrice> twoWeekAgoGoodsPricesOff = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today.minusWeeks(2), BusinessType.m);
        List<GoodsPrice> todayGoodsPricesOn = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today, BusinessType.o);
        List<GoodsPrice> twoWeekAgoGoodsPricesOn = goodsPriceRepo.findByResearchDateAndBusinessOrderByGoods(today.minusWeeks(2), BusinessType.o);

        Goods goods;
        List<Goods> goodsList = goodsRepo.findAll();
        for(int i = 0; i < goodsList.size(); i++) {
            goods = goodsList.get(i);

            priceGapOff = Math.round(todayGoodsPricesOff.get(i).getPrice() - twoWeekAgoGoodsPricesOff.get(i).getPrice());
            priceGapOn = Math.round(todayGoodsPricesOn.get(i).getPrice() - twoWeekAgoGoodsPricesOn.get(i).getPrice());

            goods.setPriceGapOff(priceGapOff);
            goods.setPriceGapOn(priceGapOn);
        }
    }
}
