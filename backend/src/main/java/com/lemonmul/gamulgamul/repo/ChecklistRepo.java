package com.lemonmul.gamulgamul.repo;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChecklistRepo extends JpaRepository<Checklist,Long> {

    //체크리스트 조회
    Optional<Checklist> findByIdAndIsDeleted(Long id, boolean isDeleted);

    //체크리스트 리스트 조회
    List<Checklist> findByUserAndIsDeletedOrderByRegDateDescIdDesc(User user, boolean isDeleted);

    //최근 체크리스트 3개 조회
    List<Checklist> findTop2ByUserAndIsDeletedOrderByRegDateDescIdDesc(User user, boolean isDeleted);

    //빈 체크리스트 모두 삭제
    @Modifying
    @Query("delete from Checklist c where c.id in :ids")
    void deleteEmptyByIdIn(@Param("ids") List<Long> ids);
}
