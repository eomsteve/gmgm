package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistCustomItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ChecklistCustomItemRepo extends JpaRepository<ChecklistCustomItem,Long> {

    Optional<ChecklistCustomItem> findByNameAndChecklist(String name, Checklist checklist);

    //해당 체크리스트의 커스텀 아이템 삭제
    @Transactional
    void deleteByChecklist(Checklist checklist);
}
