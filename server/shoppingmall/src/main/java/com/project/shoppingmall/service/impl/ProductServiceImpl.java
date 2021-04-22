package com.project.shoppingmall.service.impl;

import com.project.shoppingmall.controller.requestdto.product.RequestFindProducts;
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
    private final ProductQueryRepository productQueryRepository;

    //N+1 문제 발생
    public List<ResponseProduct> findAllByPagingAndSorting(RequestFindProducts request) {
        if (!Product.checkProductProperties(request.getSortedBy()))
            throw new IllegalArgumentException(request.getSortedBy());
        return productRepository.findAll(PageRequest.of(request.getPageNum(), request.getSize(), Sort.by(Sort.Direction.DESC, request.getSortedBy()))).getContent()
                .stream().map((product -> new ResponseProduct(product))).collect(Collectors.toList());
    }

    //N+1문제 해결
    public List<ResponseProduct> findAllByPagingAndSortingV2(RequestFindProducts request) {
        // productID를 쫙뽑아오고 난뒤 In( Product1.id,Product2.id....) 로 조회
        return productQueryRepository.findAllByPagingAndSorting(request);
    }

    // 모든 검색 Product 한 메소드에서 해결
    public List<ResponseProduct> findProducts(RequestFindProducts request) {
        if (request.getCategoryId() == null)
            return productQueryRepository.findProducts(request);
        return productQueryRepository.findProductsByCategory(request);
    }
}
