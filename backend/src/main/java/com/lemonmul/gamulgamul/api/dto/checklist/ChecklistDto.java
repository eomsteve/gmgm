package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class ChecklistDto {
    boolean empty;
    List<BasicItemDto> checklistBasicItems;
    List<CustomItemDto> checklistCustomItems;

    public ChecklistDto(int checklistSize,Checklist checklist) {
        empty = checklistSize <= 0;
        checklistBasicItems =checklist.getChecklistBasicItems()
                .stream().map(BasicItemDto::new).collect(Collectors.toList());
        checklistCustomItems =checklist.getChecklistCustomItems()
                .stream().map(CustomItemDto::new).collect(Collectors.toList());
    }
}
