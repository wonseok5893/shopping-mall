package com.project.shoppingmall.repository.product;

import com.project.shoppingmall.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
