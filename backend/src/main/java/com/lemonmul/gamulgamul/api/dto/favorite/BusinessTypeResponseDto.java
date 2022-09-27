package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.BusinessType;
import lombok.AllArgsConstructor;
import lombok.Data;

// 업태 종류를 반환하는 Dto
@Data
@AllArgsConstructor
public class BusinessTypeResponseDto {
    private BusinessType businessType;
    private String krName;
}
