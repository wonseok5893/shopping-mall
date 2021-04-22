package com.project.shoppingmall.domain;

import com.project.shoppingmall.controller.requestdto.category.RequestCategoryEnrollInfo;
import com.project.shoppingmall.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CategoryTest {

    @Autowired
    CategoryRepository categoryRepository;
    @Test
    void 카테고리등록() {

        Category category = Category.enrollCategory("Outer");
        categoryRepository.save(category);

        assertEquals(categoryRepository.countByName("Outer"), 1);

    }
}