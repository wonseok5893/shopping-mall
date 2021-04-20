package com.project.shoppingmall.controller.responsedto.common;

import java.util.List;

public class ListResult<T> {
    List<T> data;
    CommonResult commonResult;
    public ListResult(List<T> data,CommonResult commonResult) {
        this.data = data;
        this.commonResult = commonResult;
    }
}
