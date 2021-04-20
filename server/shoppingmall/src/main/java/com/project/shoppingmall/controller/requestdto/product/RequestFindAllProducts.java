package com.project.shoppingmall.controller.requestdto.product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestFindAllProducts {
    int pageNum;
    int size;
    String sortedBy;
}
