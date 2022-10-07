package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.goods.Goods;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoodsRepo extends JpaRepository<Goods, Long> {
    List<Goods> findAllByFavoriteGoodsIn(List<FavoriteGoods> favoriteGoodsList);
}
