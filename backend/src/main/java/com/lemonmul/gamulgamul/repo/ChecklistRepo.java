package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChecklistRepo extends JpaRepository<Checklist,Long> {

    List<Checklist> findByUserAndStatusOrderByRegDateDescIdDesc(User user,boolean status);
}
