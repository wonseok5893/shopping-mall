package com.project.shoppingmall.service.impl;

import com.project.shoppingmall.controller.requestdto.product.RequestFindAllProducts;
import com.project.shoppingmall.controller.responsedto.product.ResponseProduct;
import com.project.shoppingmall.domain.Product;
import com.project.shoppingmall.repository.product.ProductQueryRepository;
import com.project.shoppingmall.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl {

    private final ProductRepository productRepository;


    public List<ResponseProduct> findAllByPagingAndSorting(RequestFindAllProducts request) {
        if(!Product.checkProductProperties(request.getSortedBy())) throw new IllegalArgumentException(request.getSortedBy());
        return productRepository.findAll(PageRequest.of(request.getPageNum(), request.getSize(), Sort.by(Sort.Direction.DESC, request.getSortedBy()))).getContent()
                .stream().map((product -> new ResponseProduct(product))).collect(Collectors.toList());

    }

}
