package com.lemonmul.gamulgamul.api.dto.checklist;

import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BasicItemInfoDto {
    private Long id;
    private Long basicProductId;
    private String basicProductName;
    private boolean status;
    private double recentPriceOff;
    private double recentPriceOn;
    private double priceGapOff;
    private double priceGapOn;

    public BasicItemInfoDto(ChecklistBasicItem item) {
        id= item.getId();
        basicProductId =item.getProduct().getId();
        basicProductName =item.getProduct().getName();
        status=item.isStatus();
        recentPriceOff=item.getProduct().getRecentPriceOff();
        recentPriceOn=item.getProduct().getRecentPriceOn();
        priceGapOff=item.getProduct().getPriceGapOff();
        priceGapOn=item.getProduct().getPriceGapOn();
    }
}