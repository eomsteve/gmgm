package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteGoodsRepo extends JpaRepository<FavoriteGoods, Long> {

    @Modifying
    @Query("delete from FavoriteGoods where user=:user")
    void deleteByUser(@Param("user") User user);

    @Modifying
    @Query("delete from FavoriteGoods favoriteGoods where favoriteGoods in :favoriteGoodsList")
    void deleteIn(@Param("favoriteGoodsList") List<FavoriteGoods> favoriteGoodsList);
}
