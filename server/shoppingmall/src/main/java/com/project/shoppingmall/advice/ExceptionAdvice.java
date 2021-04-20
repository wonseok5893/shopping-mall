package com.project.shoppingmall.advice;

import com.project.shoppingmall.controller.responsedto.common.CommonResult;
import com.project.shoppingmall.exception.MemberNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult commonException(Exception e) {
        return CommonResult.getFailResult(e.getMessage());
    }

//    @ExceptionHandler(MemberNotFoundException.class)
//    protected CommonResult memberNotFoundException(HttpServletRequest request, MemberNotFoundException e) {
//        return CommonResult.getFailResult(e.getMessage());
//    }

}
