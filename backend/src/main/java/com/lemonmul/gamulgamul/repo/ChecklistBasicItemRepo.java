package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import com.lemonmul.gamulgamul.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ChecklistBasicItemRepo extends JpaRepository<ChecklistBasicItem,Long> {

    Optional<ChecklistBasicItem> findByProductAndChecklist(Product product, Checklist checklist);

    //해당 체크리스트의 기본 아이템 삭제
    @Transactional
    void deleteByChecklist(Checklist checklist);
}
