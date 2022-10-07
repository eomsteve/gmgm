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

    List<ChecklistCustomItem> findByChecklist(Checklist checklist);
}
