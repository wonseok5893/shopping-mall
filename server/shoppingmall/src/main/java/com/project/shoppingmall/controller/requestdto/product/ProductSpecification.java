package com.project.shoppingmall.controller.requestdto.product;

import com.project.shoppingmall.domain.Category;
import com.project.shoppingmall.domain.Product;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

public class ProductSpecification {
    public static Specification<Product> withTitle(String name) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }
}
