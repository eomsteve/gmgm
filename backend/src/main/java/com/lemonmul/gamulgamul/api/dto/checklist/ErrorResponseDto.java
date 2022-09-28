package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import lombok.Data;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class ErrorResponseDto {
    List<String> message;
    boolean empty;
    List<BasicItemDto> checklistBasicItems;
    List<CustomItemDto> checklistCustomItems;

    public ErrorResponseDto(RequestDto requestDto, BindingResult bindingResult){
        message = bindingResult.getAllErrors().stream().map(ObjectError::getDefaultMessage).toList();
        checklistBasicItems=requestDto.getChecklistBasicItems();
        checklistCustomItems=requestDto.getChecklistCustomItems();
        empty=checklistBasicItems.size()+checklistCustomItems.size()<=0;
    }
}
