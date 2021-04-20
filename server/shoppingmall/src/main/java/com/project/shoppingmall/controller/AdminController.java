package com.project.shoppingmall.controller;

import com.project.shoppingmall.controller.requestdto.category.RequestCategoryEnrollInfo;
import com.project.shoppingmall.controller.requestdto.product.RequestProductEnrollInfo;
import com.project.shoppingmall.domain.Member;
import com.project.shoppingmall.service.AdminService;
import com.project.shoppingmall.service.ProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
@Api(value = "관리자 카테고리")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @ApiOperation(value = "카테고리 등록")
    @PostMapping("category")
    @ResponseStatus(HttpStatus.CREATED)
    public void enrollCategory(@RequestBody RequestCategoryEnrollInfo enrollInfo) {
        adminService.enrollCategory(enrollInfo);
    }

    @ApiOperation(value = "상품 등록")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("product")
    public void enrollProduct(@RequestPart("images") List<MultipartFile> images, RequestProductEnrollInfo enrollInfo) throws IOException {
        Member admin = (Member)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        adminService.enrollProduct(enrollInfo, admin, images);
    }
}
