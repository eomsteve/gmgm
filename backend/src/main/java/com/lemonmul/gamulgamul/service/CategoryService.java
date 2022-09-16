package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.Category;
import com.lemonmul.gamulgamul.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepo categoryRepo;

    // 모든 카테고리 목록을 받아오는 함수
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    // 카테고리Id로 카테고리를 받아오는 함수
    public Category getCategory(Long categoryId) {
        return categoryRepo.findById(categoryId).orElseThrow();
    }
}
