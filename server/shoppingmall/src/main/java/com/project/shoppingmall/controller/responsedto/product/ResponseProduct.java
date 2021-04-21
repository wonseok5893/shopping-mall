package com.project.shoppingmall.controller.responsedto.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.shoppingmall.controller.responsedto.category.ResponseCategory;
import com.project.shoppingmall.controller.responsedto.file.ResponseFile;
import com.project.shoppingmall.domain.Category;
import com.project.shoppingmall.domain.File;
import com.project.shoppingmall.domain.Member;
import com.project.shoppingmall.domain.Product;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ResponseProduct {
    private Long id;
    private String name;
    private String description;
    private int price;
    private int stock;
    private ResponseCategory category;
    private List<ResponseFile> imageFiles;

    public ResponseProduct(Long id, String name, String description, int price, int stock, int categoryId, String categoryName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        category = new ResponseCategory(categoryId, categoryName);
    }

    public ResponseProduct(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.stock = product.getStock();
        this.category = new ResponseCategory(product.getCategory());
        this.imageFiles = product.getImageFiles().stream().map((file)->new ResponseFile(file)).collect(Collectors.toList());
    }
}
