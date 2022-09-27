package com.lemonmul.gamulgamul.api.dto.checklist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestDto {
    List<BasicItemDto> checklistBasicItems;
    @Valid
    List<CustomItemDto> checklistCustomItems;
}
