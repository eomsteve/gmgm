package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChecklistRepo extends JpaRepository<Checklist,Long> {

    //체크리스트 조회
    Optional<Checklist> findByIdAndIsDeleted(Long id, boolean isDeleted);

    //체크리스트 리스트 조회
    List<Checklist> findByUserAndIsDeletedOrderByRegDateDescIdDesc(User user, boolean isDeleted);

    //최근 체크리스트 3개 조회
    List<Checklist> findTop3ByUserAndIsDeletedOrderByRegDateDescIdDesc(User user, boolean isDeleted);

}
