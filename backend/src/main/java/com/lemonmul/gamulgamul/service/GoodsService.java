package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.repo.GoodsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GoodsService {

    private final GoodsRepo goodsRepo;

    /**
     * 상품 id로 상품을 받아오는 함수
     */
    public Goods getGoodsById(Long goodsId) {
        return goodsRepo.findById(goodsId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));
    }

    /**
     * 상품 id 리스트로 상품 리스트를 받아오는 함수
     */
    public List<Goods> getGoodsList(List<Long> goodsIds) {
        return goodsRepo.findAllById(goodsIds);
    }
}
