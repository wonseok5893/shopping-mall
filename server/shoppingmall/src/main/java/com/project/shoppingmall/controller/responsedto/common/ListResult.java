package com.project.shoppingmall.controller.responsedto.common;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
public class ListResult<T> {
    List<T> data;
    CommonResult commonResult;
    public ListResult(List<T> data,CommonResult commonResult) {
        this.data = data;
        this.commonResult = commonResult;
    }
}
