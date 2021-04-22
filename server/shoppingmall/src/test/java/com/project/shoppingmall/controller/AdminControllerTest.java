package com.project.shoppingmall.controller;

import com.project.shoppingmall.controller.requestdto.category.RequestCategoryEnrollInfo;
import com.project.shoppingmall.exception.DuplicationCategoryNameException;
import com.project.shoppingmall.service.AdminService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
class AdminControllerTest {

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    private AdminService adminService;

    @Test
    void 카테고리_등록() {

        adminService.enrollCategory("Outer");

        boolean existCategory = adminService.isDuplicatedCategory("Outer");

        assertTrue(existCategory);
    }

    @Test
    void 카테고리_존재시_실패() {

        adminService.enrollCategory("outer");

        assertThrows(DuplicationCategoryNameException.class, () -> adminService.enrollCategory("outer"));
    }
}