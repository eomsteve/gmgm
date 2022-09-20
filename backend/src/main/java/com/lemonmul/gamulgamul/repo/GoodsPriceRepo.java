package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GoodsPriceRepo extends JpaRepository<GoodsPrice, Long> {
    List<GoodsPrice> findAllByBusinessAndGoodsIn(BusinessType business, List<Goods> goodsList);

    //선택 품목, 선택 업태의 상품 가격 정보
    List<GoodsPrice> findByGoodsAndBusinessOrderByResearchDate(Goods goods, BusinessType business);

    //선택 품목, 온라인 업태의 상품 최신 가격
    Optional<GoodsPrice> findFirstByGoodsAndBusinessOrderByResearchDateDesc(Goods goods, BusinessType business);
}
