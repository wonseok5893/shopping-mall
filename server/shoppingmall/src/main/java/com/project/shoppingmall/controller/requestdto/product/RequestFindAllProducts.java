package com.project.shoppingmall.controller.requestdto.product;

import lombok.Data;

@Data
public class RequestFindAllProducts {
    int pageNum;
    int size;
    String sortedBy;
}
