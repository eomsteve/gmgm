package com.lemonmul.gamulgamul.api;

import com.lemonmul.gamulgamul.api.dto.checklist.CategoryDto;
import com.lemonmul.gamulgamul.api.dto.checklist.ChecklistDto;
import com.lemonmul.gamulgamul.api.dto.checklist.ChecklistListDto;
import com.lemonmul.gamulgamul.api.dto.checklist.ChecklistRequestDto;
import com.lemonmul.gamulgamul.entity.checklist.Checklist;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.security.jwt.JwtTokenProvider;
import com.lemonmul.gamulgamul.service.CategoryService;
import com.lemonmul.gamulgamul.service.ChecklistService;
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
    public Long createChecklist(@RequestHeader HttpHeaders headers){
        User user = JwtTokenProvider.getUserFromJwtToken(userService, headers);
        return checklistService.createChecklist(user);
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
     * todo 해당 유저의 체크리스트인지 확인 필요?
     */
    @PutMapping("/{checklistId}")
    public boolean modifyChecklist(@RequestBody ChecklistRequestDto checklistRequestDto){



        return true;
    }

    /**
     * 체크리스트 조회
     * todo 체크리스트 수정 작성 후 동작 확인 필요
     * todo 해당 유저의 체크리스트인지 확인 필요?
     */
    @GetMapping("/{checklistId}")
    public ChecklistDto checklist(@PathVariable Long checklistId){
        Checklist checklist = checklistService.checklist(checklistId);
        return new ChecklistDto(checklist);
    }

    /**
     * 체크리스트 삭제
     * todo 해당 유저의 체크리스트인지 확인 필요?
     */
    @DeleteMapping("/{checklistId}")
    public boolean deleteChecklist(@PathVariable Long checklistId){
        checklistService.deleteChecklist(checklistId);
        return true;
    }
}
