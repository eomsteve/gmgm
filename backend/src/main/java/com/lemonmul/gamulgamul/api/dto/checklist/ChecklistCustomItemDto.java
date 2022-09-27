package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.ChecklistCustomItem;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChecklistCustomItemDto {
    private Long id;
    private String customProductName;
    private boolean status;

    public ChecklistCustomItemDto(ChecklistCustomItem checklistCustomItem) {
        id=checklistCustomItem.getId();
        customProductName = checklistCustomItem.getName();
        status= checklistCustomItem.isStatus();
    }
}
