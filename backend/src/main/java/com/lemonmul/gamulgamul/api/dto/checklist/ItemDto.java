package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistCustomItem;
import lombok.Data;

@Data
public class ItemDto {
    private String productName;
    private boolean status;

    public ItemDto(ChecklistBasicItem item) {
        productName=item.getProduct().getName();
        status=item.isStatus();
    }

    public ItemDto(ChecklistCustomItem item) {
        productName=item.getName();
        status=item.isStatus();
    }
}
