package com.project.shoppingmall.controller.requestdto.product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestFindProducts {
    String SearchingBy;
    Integer categoryId;
    int pageNum;
    int size;
    String sortedBy;

    public RequestFindProducts(int pageNum, int size, String sortedBy) {
        this.pageNum = pageNum;
        this.size = size;
        this.sortedBy = sortedBy;
    }
}
