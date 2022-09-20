package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChecklistBasicItemDto {
    private Long id;
    private String name;

    public ChecklistBasicItemDto(ChecklistBasicItem checklistBasicItem) {
        id= checklistBasicItem.getId();
        name=checklistBasicItem.getProduct().getName();
    }
}
