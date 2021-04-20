package com.project.shoppingmall.controller;

import com.project.shoppingmall.controller.requestdto.product.RequestFindAllProducts;
import com.project.shoppingmall.controller.responsedto.product.ResponseProduct;
import com.project.shoppingmall.domain.Product;
import com.project.shoppingmall.service.impl.ProductServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServiceImpl productService;
    @GetMapping("")
    public List<ResponseProduct> findAll(RequestFindAllProducts requestfindAllProducts){
        return productService.findAllByPagingAndSorting(requestfindAllProducts);
    }
}
