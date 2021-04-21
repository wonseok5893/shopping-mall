package com.project.shoppingmall.service.impl;

import com.project.shoppingmall.controller.requestdto.product.RequestFindAllProducts;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ProductServiceImplTest {

    @Autowired
    private ProductServiceImpl productService;

    @Test
    void findAllByPagingAndSorting() {
        RequestFindAllProducts requestFindAllProducts = new RequestFindAllProducts(0, 10, "id");
        productService.findAllByPagingAndSorting(requestFindAllProducts);
    }

    @Test
    void findAllByPagingAndSortingV2() {
        RequestFindAllProducts requestFindAllProducts = new RequestFindAllProducts(0, 10, "id");
        productService.findAllByPagingAndSortingV2(requestFindAllProducts);
    }
}