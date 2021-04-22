package com.project.shoppingmall.controller.responsedto.common;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
public class ListResult<T> {
    CommonResult commonResult;
    List<T> data;
    public ListResult(List<T> data,CommonResult commonResult) {
        this.data = data;
        this.commonResult = commonResult;
    }
}
