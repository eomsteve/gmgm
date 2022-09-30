package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.favorite.FavoriteGoods;
import com.lemonmul.gamulgamul.repo.FavoriteGoodsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FavoriteGoodsService {

    private final FavoriteGoodsRepo favoriteGoodsRepo;

    /**
     * 즐겨찾기 목록을 갱신하는 함수
     */
    @Transactional
    public void updateFavoriteGoodsList(List<FavoriteGoods> addList, List<FavoriteGoods> deleteList) {
        favoriteGoodsRepo.deleteIn(deleteList);
        favoriteGoodsRepo.saveAll(addList);
    }
}
