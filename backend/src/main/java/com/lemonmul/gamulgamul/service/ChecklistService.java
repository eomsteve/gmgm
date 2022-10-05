package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.ChecklistRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChecklistService {

    private final ChecklistRepo checklistRepo;

    /**
     * 빈 체크리스트 생성
     */
    @Transactional
    public Long createChecklist(User user){
        Checklist checklist = checklistRepo.save(Checklist.of(user));
        return checklist.getId();
    }

    /**
     * 체크리스트 리스트 조회
     *  해당 유저의 체크리스트들을 작성일 내림차순으로 반환
     */
    public List<Checklist> checklistList(User user){
        return checklistRepo.findByUserAndIsDeletedOrderByRegDateDescIdDesc(user,false);
    }

    /**
     * 체크리스트 조회
     */
    public Checklist checklist(Long checklistId){
        return checklistRepo.findByIdAndIsDeleted(checklistId,false)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 장보기 목록입니다."));
    }

    /**
     * 체크리스트 삭제
     */
    @Transactional
    public void deleteChecklist(Long checklistId){
        Checklist checklist = checklistRepo.findById(checklistId)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 장보기 목록입니다."));
        checklist.setIsDeleted(true);
    }

    /**
     * 빈 체크리스트 삭제
     */
    public void deleteEmptyChecklist(Long checklistId){
        checklistRepo.deleteById(checklistId);
    }
}
