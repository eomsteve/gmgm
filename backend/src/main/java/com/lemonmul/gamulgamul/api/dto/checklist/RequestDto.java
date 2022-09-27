package com.lemonmul.gamulgamul.api.dto.checklist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestDto {
    List<BasicItemDto> checklistBasicItems;
    List<CustomItemDto> checklistCustomItems;
}
