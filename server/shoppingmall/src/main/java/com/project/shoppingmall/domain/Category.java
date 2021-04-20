package com.project.shoppingmall.domain;

import com.project.shoppingmall.controller.requestdto.category.RequestCategoryEnrollInfo;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    private List<Product> products = new ArrayList<>();

    // 생성 메서드
    public static Category enrollCategory(RequestCategoryEnrollInfo categoryEnrollInfo){
        Category category = new Category();
        category.name = categoryEnrollInfo.getName();
        return category;
    }


}
