package com.project.shoppingmall.controller;

import com.project.shoppingmall.aop.LogExecutionTime;
import com.project.shoppingmall.controller.requestdto.product.RequestFindProducts;
import com.project.shoppingmall.controller.responsedto.common.CommonResult;
import com.project.shoppingmall.controller.responsedto.common.ListResult;
import com.project.shoppingmall.controller.responsedto.product.ResponseProduct;
import com.project.shoppingmall.domain.Product;
import com.project.shoppingmall.service.impl.ProductServiceImpl;
import com.sun.istack.Nullable;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServiceImpl productService;

    @LogExecutionTime
    @ApiOperation(value = "상품 조회")
    @GetMapping("")
    public ListResult<ResponseProduct> findProductsByPagingAndSorting(@RequestParam(value = "searchingBy",required = false,defaultValue = "") String searchingBy,
                                                              @RequestParam(value = "categoryId",required = false) Integer categoryId,
                                                              @RequestParam(value = "pageNum", defaultValue = "0") int pageNum,
                                                              @RequestParam(value = "size", defaultValue = "12") int size,
                                                              @RequestParam(value = "sortedBy",defaultValue = "createdDate") String sortedBy) {
        return new ListResult<>(
                productService.findProducts(new RequestFindProducts(searchingBy, categoryId, pageNum, size, sortedBy)),CommonResult.getSuccessResult());
    }
}
