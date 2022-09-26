package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.api.dto.checklist.ChecklistBasicItemDto;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import com.lemonmul.gamulgamul.repo.ChecklistBasicItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChecklistBasicItemService {

    private ChecklistBasicItemRepo basicItemRepo;

    @Transactional
    public void updateStatus(Checklist checklist, List<ChecklistBasicItemDto> checklistBasicItem){
        List<ChecklistBasicItem> basicItems = basicItemRepo.findByChecklist(checklist);
        for (ChecklistBasicItem basicItem : basicItems) {
            Optional<ChecklistBasicItemDto> optional = checklistBasicItem
                    .stream().filter(i -> i.getId().equals(basicItem.getId())).findAny();
            if(optional.isPresent()){
                basicItem.setStatus(optional.get().isStatus());
            }else{
                //todo
                throw new IllegalArgumentException();
            }
        }
    }
}
