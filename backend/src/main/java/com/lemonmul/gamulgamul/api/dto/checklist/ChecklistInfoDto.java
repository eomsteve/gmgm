package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class ChecklistInfoDto {
    boolean empty;
    boolean basicEmpty;
    boolean customEmpty;
    List<BasicItemInfoDto> checklistBasicItems;
    List<CustomItemDto> checklistCustomItems;

    public ChecklistInfoDto(Checklist checklist) {
        checklistBasicItems =checklist.getChecklistBasicItems()
                .stream().map(BasicItemInfoDto::new)
                .sorted(BasicItemInfoDto::compareTo).collect(Collectors.toList());
        checklistCustomItems =checklist.getChecklistCustomItems()
                .stream().map(CustomItemDto::new).collect(Collectors.toList());
        basicEmpty=checklistBasicItems.size()<=0;
        customEmpty=checklistCustomItems.size()<=0;
        empty = basicEmpty&&customEmpty;
    }
}