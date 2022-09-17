package com.lemonmul.gamulgamul.api.dto.checklist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChecklistRequestDto {
    List<ChecklistBasicItemRequestDto> checklistBasicItem;
    List<ChecklistCustomItemRequestDto> checklistCustomItem;
}
