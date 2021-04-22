package com.project.shoppingmall.service;

import com.project.shoppingmall.controller.requestdto.category.RequestCategoryEnrollInfo;
import com.project.shoppingmall.controller.requestdto.member.RequestMemberSignUpDto;
import com.project.shoppingmall.controller.requestdto.product.RequestProductEnrollInfo;
import com.project.shoppingmall.domain.Category;
import com.project.shoppingmall.domain.Member;
import com.project.shoppingmall.domain.Product;

import java.util.Optional;

public interface AdminService extends ProductService{

    void enrollCategory(String name);

    boolean isDuplicatedCategory(String name);

}
