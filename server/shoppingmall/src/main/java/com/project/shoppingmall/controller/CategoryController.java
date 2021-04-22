package com.project.shoppingmall.controller;

import com.project.shoppingmall.controller.responsedto.common.CommonResult;
import com.project.shoppingmall.controller.responsedto.common.ListResult;
import com.project.shoppingmall.domain.Category;
import com.project.shoppingmall.repository.CategoryRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value = "카테고리 컨트롤러")
@RequestMapping("/category")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @ApiOperation(value = "모드 카테고리 조회")
    @GetMapping("")
    public ListResult<Category> findAll() {
        return new ListResult<>(categoryRepository.findAll(Sort.by(Sort.Direction.DESC, "id")), CommonResult.getSuccessResult());
    }
}
