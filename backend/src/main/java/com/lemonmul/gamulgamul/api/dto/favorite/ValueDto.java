package com.lemonmul.gamulgamul.api.dto.favorite;

import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import lombok.Data;

@Data
public class ValueDto {

    private double value;

    public ValueDto(PriceIndex index) {
        value=index.getValue();
    }
}
