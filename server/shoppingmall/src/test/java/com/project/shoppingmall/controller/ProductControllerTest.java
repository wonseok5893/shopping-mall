package com.project.shoppingmall.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void 검색() throws Exception {
        // 검색어로 검색
        MultiValueMap<String, String> paramsInfo = new LinkedMultiValueMap<>();
        paramsInfo.add("searchingBY", "최원석");
        mockMvc.perform(get("/product").params(paramsInfo))
                .andExpect(status().isOk())
                .andDo(print());
        //검색어 + 카테고리Id로 검색
        paramsInfo.add("categoryId", "1");
        mockMvc.perform(get("/product").params(paramsInfo))
                .andExpect(status().isOk())
                .andDo(print());


    }
}