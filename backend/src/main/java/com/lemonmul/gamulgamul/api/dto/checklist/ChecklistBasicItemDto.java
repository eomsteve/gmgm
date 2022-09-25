package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChecklistBasicItemDto {
    private Long id;
    private Long productId;
    private String name;

    private boolean status;

    public ChecklistBasicItemDto(ChecklistBasicItem checklistBasicItem) {
        id= checklistBasicItem.getId();
        //todo fetch join 적용하기
        productId=checklistBasicItem.getProduct().getId();
        name=checklistBasicItem.getProduct().getName();
        status=checklistBasicItem.isStatus();
    }
}
