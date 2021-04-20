package com.project.shoppingmall.controller;

import com.project.shoppingmall.controller.requestdto.product.RequestFindAllProducts;
import com.project.shoppingmall.controller.responsedto.common.CommonResult;
import com.project.shoppingmall.controller.responsedto.common.ListResult;
import com.project.shoppingmall.controller.responsedto.product.ResponseProduct;
import com.project.shoppingmall.domain.Product;
import com.project.shoppingmall.service.impl.ProductServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServiceImpl productService;

    @GetMapping("")
    public ListResult<ResponseProduct> findAllByPagingAndSorting(@RequestParam(value = "pageNum", defaultValue = "0") int pageNum, @RequestParam(value = "size", defaultValue = "10") int size, @RequestParam(value = "sortedBy") String sortedBy) {
        return new ListResult<>(productService.findAllByPagingAndSorting(new RequestFindAllProducts(pageNum, size, sortedBy)), CommonResult.getSuccessResult());
    }
}
