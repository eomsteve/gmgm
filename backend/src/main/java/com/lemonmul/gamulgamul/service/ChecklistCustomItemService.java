package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.api.dto.checklist.ChecklistBasicItemDto;
import com.lemonmul.gamulgamul.api.dto.checklist.ChecklistCustomItemDto;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistCustomItem;
import com.lemonmul.gamulgamul.repo.ChecklistCustomItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChecklistCustomItemService {

    private final ChecklistCustomItemRepo customItemRepo;

    public void updateStatus(Checklist checklist, List<ChecklistCustomItemDto> checklistCustomItem) {
        List<ChecklistCustomItem> customItems = customItemRepo.findByChecklist(checklist);
        for (ChecklistCustomItem customItem : customItems) {
            Optional<ChecklistCustomItemDto> optional = checklistCustomItem
                    .stream().filter(i -> i.getId().equals(customItem.getId())).findAny();
            if(optional.isPresent()){
                customItem.setStatus(optional.get().isStatus());
            }else {
                //todo
                throw new IllegalArgumentException();
            }
        }
    }
}
