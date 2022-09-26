package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistCustomItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ChecklistCustomItemRepo extends JpaRepository<ChecklistCustomItem,Long> {

    //해당 체크리스트의 커스텀 아이템 삭제
    @Transactional
    @Modifying
    @Query("delete from ChecklistCustomItem where checklist=:checklist")
    void deleteByChecklist(@Param("checklist") Checklist checklist);

    List<ChecklistCustomItem> findByChecklist(Checklist checklist);
}
