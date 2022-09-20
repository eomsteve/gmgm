package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.BusinessType;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.entity.goods.GoodsPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoodsPriceRepo extends JpaRepository<GoodsPrice, Long> {
    List<GoodsPrice> findAllByBusinessTypeAndGoodsIn(BusinessType business, List<Goods> goodsList);

    List<GoodsPrice> findAllByGoodsAndBusinessType(Goods goods, BusinessType business);
}
