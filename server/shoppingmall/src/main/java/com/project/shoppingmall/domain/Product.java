package com.project.shoppingmall.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.shoppingmall.controller.requestdto.product.RequestProductEnrollInfo;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Builder @NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private int price;
    private int stock;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Member admin;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<File> imageFiles = new ArrayList<>();


    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    //상품 등록 메서드
    public static Product enrollProduct(RequestProductEnrollInfo enrollInfo,Member admin,Category category) {
        return Product.builder()
                .name(enrollInfo.getName())
                .description(enrollInfo.getDescription())
                .price(enrollInfo.getPrice())
                .stock(enrollInfo.getStock())
                .category(category)
                .admin(admin)
                .build();
    }

    public static boolean checkProductProperties(String sortedBy){
        return Arrays.stream(Product.class.getDeclaredFields()).anyMatch((field -> field.getName().equals(sortedBy)));
    }

}
