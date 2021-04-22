package com.project.shoppingmall.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.shoppingmall.controller.requestdto.category.RequestCategoryEnrollInfo;
import lombok.*;
import net.bytebuddy.implementation.bind.annotation.IgnoreForBinding;

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

    @JsonIgnore
    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    private List<Product> products = new ArrayList<>();

    // 생성 메서드
    public static Category enrollCategory(String name){
        Category category = new Category();
        category.name = name;
        return category;
    }


}
