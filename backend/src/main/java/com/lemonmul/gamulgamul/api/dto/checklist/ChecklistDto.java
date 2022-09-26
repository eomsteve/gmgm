package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class ChecklistDto {
    List<ChecklistBasicItemDto> checklistBasicItems;
    List<ChecklistCustomItemDto> checklistCustomItems;

    public ChecklistDto(Checklist checklist) {
        checklistBasicItems =checklist.getChecklistBasicItems()
                .stream().map(ChecklistBasicItemDto::new).collect(Collectors.toList());
        checklistCustomItems =checklist.getChecklistCustomItems()
                .stream().map(ChecklistCustomItemDto::new).collect(Collectors.toList());
    }
}
