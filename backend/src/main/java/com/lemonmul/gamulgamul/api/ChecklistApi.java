package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.checklist.*;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistBasicItem;
import com.lemonmul.gamulgamul.entity.checklist.ChecklistCustomItem;
import com.lemonmul.gamulgamul.entity.product.Product;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider;
import com.lemonmul.gamulgamul.service.CategoryService;
import com.lemonmul.gamulgamul.service.ChecklistService;
import com.lemonmul.gamulgamul.service.ProductService;
import com.lemonmul.gamulgamul.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/checklist")
@RequiredArgsConstructor
public class ChecklistApi {

    private final ChecklistService checklistService;
    private final UserService userService;
    private final CategoryService categoryService;
    private final ProductService productService;

    /**
     * 체크리스트 리스트 조회
     */
    @GetMapping("/list")
    public List<ChecklistListDto> checklistList(@RequestHeader HttpHeaders headers){
        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        List<Checklist> checklists = checklistService.checklistList(user);
        return checklists.stream().map(ChecklistListDto::new).collect(Collectors.toList());
    }

    /**
     * 빈 체크리스트 생성
     */
    @PostMapping()
    public ChecklistResponseDto createChecklist(@RequestHeader HttpHeaders headers){
        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        return new ChecklistResponseDto(checklistService.createChecklist(user));
    }

    /**
     * 체크리스트 품목 선택 페이지
     */
    @GetMapping("/select")
    public List<CategoryDto> checklistProductSelect(){
        return categoryService.getAllCategories().stream().map(CategoryDto::new).collect(Collectors.toList());
    }

    /**
     * 체크리스트 수정
     * todo 해당 유저의 체크리스트인지 확인 필요
     */
    @PutMapping("/{checklistId}")
    public ChecklistResponseDto modifyChecklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId,
                                                @RequestBody ChecklistRequestDto checklistRequestDto){
        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user,checklist);

        fillBasicItem(checklistRequestDto.getChecklistBasicItem(), checklist);
        fillCustomItem(checklistRequestDto.getChecklistCustomItem(), checklist);

        return new ChecklistResponseDto(checklistId);
    }

    /**
     * 체크리스트 조회
     * todo 체크리스트 수정 작성 후 동작 확인 필요
     */
    @GetMapping("/{checklistId}")
    public ChecklistDto checklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId){
        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user,checklist);

        return new ChecklistDto(checklist);
    }

    /**
     * 체크리스트 삭제
     */
    @DeleteMapping("/{checklistId}")
    public ChecklistResponseDto deleteChecklist(@RequestHeader HttpHeaders headers, @PathVariable Long checklistId){
        User user = JwtTokenProvider.getUserFromJwtToken(userService,headers);
        Checklist checklist = checklistService.checklist(checklistId);
        checkOwnership(user, checklist);

        checklistService.deleteChecklist(checklistId);
        return new ChecklistResponseDto(checklistId);
    }

    /**
     * 해당 유저의 체크리스트인지 확인
     */
    private void checkOwnership(User user, Checklist checklist) {
        if(!checklist.getUser().equals(user)){
            //todo 더 적절한 예외 있으면 바꾸기, 아니면 사용자 예외 만들기
            throw new IllegalArgumentException();
        }
    }

    /**
     * 체크리스트 수정 - 기본 아이템 채우기
     * todo db에 flush 안되는거 해결하기
     */
    private void fillBasicItem(List<ChecklistBasicItemRequestDto> basicItem, Checklist checklist) {
        List<ChecklistBasicItem> checklistBasicItems = checklist.getChecklistBasicItems();
        if(!checklistBasicItems.isEmpty()){
            checklistBasicItems.clear();
        }

        for (ChecklistBasicItemRequestDto item : basicItem) {
            Product product = productService.product(item.getProductId());
            checklistBasicItems.add(ChecklistBasicItem.of(checklist,product));
        }
    }

    /**
     * 체크리스트 수정 - 커스텀 아이템 채우기
     * todo db에 flush 안되는거 해결하기
     */
    private void fillCustomItem(List<ChecklistCustomItemRequestDto> customItem, Checklist checklist) {
        List<ChecklistCustomItem> checklistCustomItems = checklist.getChecklistCustomItems();
        if(!checklistCustomItems.isEmpty()){
            checklistCustomItems.clear();
        }

        for (ChecklistCustomItemRequestDto item : customItem) {
            checklistCustomItems.add(ChecklistCustomItem.of(item.getProductName(), checklist));
        }
    }
}
