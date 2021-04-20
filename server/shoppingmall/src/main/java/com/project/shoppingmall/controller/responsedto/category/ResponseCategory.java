package com.project.shoppingmall.controller.responsedto.category;

import com.project.shoppingmall.domain.Category;
import lombok.Data;

@Data
public class ResponseCategory {
    int id;
    String name;

    public ResponseCategory(Category category) {
        this.id = category.getId();
        this.name = category.getName();
    }
}
