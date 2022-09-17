package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class ChecklistDto {
    List<ChecklistBasicItemDto> checklistBasicItem;
    List<ChecklistCustomItemDto> checklistCustomItem;

    public ChecklistDto(Checklist checklist) {
        checklistBasicItem=checklist.getChecklistBasicItems()
                .stream().map(ChecklistBasicItemDto::new).collect(Collectors.toList());
        checklistCustomItem=checklist.getChecklistCustomItems()
                .stream().map(ChecklistCustomItemDto::new).collect(Collectors.toList());
    }
}
