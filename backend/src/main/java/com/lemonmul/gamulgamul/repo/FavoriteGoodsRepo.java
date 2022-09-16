package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteGoodsRepo extends JpaRepository<FavoriteGoods, Long> {
    List<FavoriteGoods> findAllByUserId(Long userId);
}
