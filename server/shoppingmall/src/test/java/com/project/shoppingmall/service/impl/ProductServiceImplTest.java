package com.project.shoppingmall.service.impl;

import com.project.shoppingmall.controller.requestdto.product.RequestFindProducts;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class ProductServiceImplTest {

    @Autowired
    private ProductServiceImpl productService;

    @Test
    void findAllByPagingAndSorting() {
        RequestFindProducts requestFindProducts = new RequestFindProducts(0, 10, "id");
        productService.findAllByPagingAndSorting(requestFindProducts);
    }

    @Test
    void findAllByPagingAndSortingV2() {
        RequestFindProducts requestFindProducts = new RequestFindProducts(0, 10, "id");
        productService.findAllByPagingAndSortingV2(requestFindProducts);
    }
}