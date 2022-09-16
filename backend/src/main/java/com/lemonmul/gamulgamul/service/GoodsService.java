package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.goods.Goods;
import com.lemonmul.gamulgamul.repo.GoodsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GoodsService {

    private final GoodsRepo goodsRepo;

    // 상품Id로 상품 정보를 받아오는 함수
    public Goods getGoodsById(Long goodsId) {
        return goodsRepo.findById(goodsId).get();
    }
}
