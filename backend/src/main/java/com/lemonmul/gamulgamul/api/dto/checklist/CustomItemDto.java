package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.ChecklistCustomItem;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class CustomItemDto {
    private Long id;
    private String customProductName;
    private boolean status;

    public CustomItemDto(ChecklistCustomItem checklistCustomItem) {
        id= checklistCustomItem.getId();
        customProductName = checklistCustomItem.getName();
        status= checklistCustomItem.isStatus();
    }
}
