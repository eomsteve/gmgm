package com.lemonmul.gamulgamul.api.dto.checklist;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class StatusResponseDto {
    private int checkedBasicSize;
    private int uncheckedBasicSize;
    private int checkedCustomSize;
    private int uncheckedCustomSize;

    public StatusResponseDto(List<BasicItemDto> basicItem, List<CustomItemDto> customItem) {
        checkedBasicSize=basicItem.stream().filter(i->i.isStatus()).toList().size();
        uncheckedBasicSize=basicItem.stream().filter(i->!i.isStatus()).toList().size();
        checkedCustomSize=customItem.stream().filter(i->i.isStatus()).toList().size();
        uncheckedCustomSize=customItem.stream().filter(i->!i.isStatus()).toList().size();
    }
}
