package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.priceindex.IndexType;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.ChecklistRepo;
import com.lemonmul.gamulgamul.repo.PriceIndexRepo;
import com.lemonmul.gamulgamul.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {

    private final PriceIndexRepo priceIndexRepo;
    private final ChecklistRepo checklistRepo;

    /**
     * 국가, 가물가물 최신 index 조회
     * */
    public PriceIndex getIndex(IndexType indexType){
        return priceIndexRepo.findTopByIndexTypeOrderByResearchDateDesc(indexType);
    }

    /**
     * 즐겨찾기 지수 최신 index 조회
     */
    public PriceIndex getFavoriteIndex(User user, IndexType indexType){
        return priceIndexRepo.findTopByUserAndIndexTypeOrderByResearchDateDesc(user, indexType);
    }

    /**
     * 최신 Checklist 조회
     * 해당 유저의 체크리스트 최대 3개를 반환
     * */
    public List<Checklist> getRecentChecklists(User user){
        List<Checklist> checklists = checklistRepo.findByUserAndIsDeletedOrderByRegDateDescIdDesc(user, false);
        if (checklists.size() > 3)
            return checklists.subList(checklists.size() - 3, checklists.size() - 1);
        else
            return checklists;
    }

    /**
     * 물가 관련 뉴스 조회
     * */

}
