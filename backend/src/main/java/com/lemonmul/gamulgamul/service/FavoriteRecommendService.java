package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.api.dto.favorite.FavoriteRecommendDto;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.FavoriteRecommendRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FavoriteRecommendService {
    private final FavoriteRecommendRepo favoriteRecommendRepo;

    /**
     * 이미 즐겨찾기 목록에 있는 항목을 제외한 즐겨찾기 추천 목록을 받아오는 함수
     */
    public List<FavoriteRecommendDto> getFavoriteRecommends(User user, List<Long> goodsIds) {
        return favoriteRecommendRepo.findTop2ByUserAndGoodsIdNotInOrderByScore(user, goodsIds).stream().map(FavoriteRecommendDto::new).collect(Collectors.toList());
    }
}
