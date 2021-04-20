package com.project.shoppingmall.repository.product;

import com.project.shoppingmall.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {

}
