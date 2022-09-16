package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.repo.GoodsPriceRepo;
import com.lemonmul.gamulgamul.repo.GoodsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GoodsPriceService {
    private final GoodsPriceRepo goodsPriceRepo;
    private final GoodsRepo goodsRepo;

    // 상품Id와 업태 타입으로 상품 가격을 받아오는 함수
    public List<GoodsPrice> getGoodsPrices(Long goodsId, BusinessType businessType) {
        Goods goods = goodsRepo.findById(goodsId).get();

        return goodsPriceRepo.findAllByGoodsAndBusinessType(goods, businessType);
    }
}
