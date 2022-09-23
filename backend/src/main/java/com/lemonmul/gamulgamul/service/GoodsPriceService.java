package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import com.lemonmul.gamulgamul.repo.GoodsPriceRepo;
import com.lemonmul.gamulgamul.repo.GoodsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GoodsPriceService {
    private final GoodsPriceRepo goodsPriceRepo;
    private final GoodsRepo goodsRepo;

    // 상품과 업태 타입으로 상품 가격을 받아오는 함수
    public List<GoodsPrice> getRecentGoodsPrices(Goods goods, BusinessType business) {
        return goodsPriceRepo.findTop2ByGoodsAndBusinessOrderByResearchDateDesc(goods, business);
    }

    // 리스트에 들어있는 상품들과 업태 타입으로 상품 가격을 받아오는 함수
    public List<GoodsPrice> getGoodsPricesInList(List<Goods> goodsList, BusinessType businessType) {
        return goodsPriceRepo.findAllByBusinessAndGoodsIn(businessType, goodsList);
    }

    /**
     * 선택 품목, 업태의 상품 가격 정보 (날짜 오름차순)
     */
    public List<GoodsPrice> goodsPricesFor1yearByBusinessType(Goods goods, BusinessType business){
        LocalDate today = LocalDate.now();
        return goodsPriceRepo.findByGoodsAndBusinessAndResearchDateBetweenOrderByResearchDate(
                goods, business, today.minusYears(1), today);
    }

    /**
     * 선택 품목, 온라인 업태의 상품 최신 가격 정보
     */
    public GoodsPrice goodsCheapPrice(Goods goods){
        Optional<GoodsPrice> optional = goodsPriceRepo.findFirstByGoodsAndBusinessOrderByResearchDateDesc(goods,BusinessType.o);
        return optional.orElseGet(() -> GoodsPrice.of(-1.0, -1.0, LocalDate.now(), BusinessType.o, goods));
    }
}
