package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteRecommend;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRecommendRepo extends JpaRepository<FavoriteRecommend, Long> {
    List<FavoriteRecommend> findByUserAndGoodsIdNotIn(User user, List<Long> goodsIds);
}
