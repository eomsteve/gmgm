package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BasicItemDto implements Comparable<BasicItemDto>{
    private Long id;
    private Long basicProductId;
    private String basicProductName;
    private boolean status;

    public BasicItemDto(ChecklistBasicItem checklistBasicItem) {
        id= checklistBasicItem.getId();
        //todo fetch join 적용하기
        basicProductId =checklistBasicItem.getProduct().getId();
        basicProductName =checklistBasicItem.getProduct().getName();
        status=checklistBasicItem.isStatus();
    }

    @Override
    public int compareTo(BasicItemDto o) {
        return (int) (o.getId()-this.getId());
    }
}
