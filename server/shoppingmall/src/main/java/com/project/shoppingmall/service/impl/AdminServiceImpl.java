package com.project.shoppingmall.service.impl;

import com.project.shoppingmall.controller.requestdto.category.RequestCategoryEnrollInfo;
import com.project.shoppingmall.controller.requestdto.product.RequestProductEnrollInfo;
import com.project.shoppingmall.domain.Category;
import com.project.shoppingmall.domain.Member;
import com.project.shoppingmall.domain.Product;
import com.project.shoppingmall.exception.DuplicationCategoryNameException;
import com.project.shoppingmall.exception.NotCategoryExistException;
import com.project.shoppingmall.repository.CategoryRepository;
import com.project.shoppingmall.repository.FileRepository;
import com.project.shoppingmall.repository.product.ProductRepository;
import com.project.shoppingmall.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminServiceImpl implements AdminService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final FileRepository fileRepository;

    @Value("${custom.path.upload}")
    private String uploadPath;

    @Transactional
    public void enrollCategory(String name) {
        if(isDuplicatedCategory(name))throw new DuplicationCategoryNameException(name);
        Category enrollCategory = Category.enrollCategory(name);
        categoryRepository.save(enrollCategory);
    }

    public boolean isDuplicatedCategory(String name) {
        return categoryRepository.countByName(name)==1;
    }

    @Transactional
    public void enrollProduct(RequestProductEnrollInfo enrollInfo, Member admin, List<MultipartFile> files) throws IOException {
        int categoryId = enrollInfo.getCategoryId();
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new NotCategoryExistException(categoryId));

        Product enrollProduct = Product.enrollProduct(enrollInfo, admin, category);
        productRepository.save(enrollProduct);

        requestFilesToFiles(files,uploadPath).forEach((file) ->{
            file.setProduct(enrollProduct);
            fileRepository.save(file);
        });
    }

    @Override
    public void saveFile(MultipartFile multipartFile, String relativePath, String newFileName) throws IOException {
        File dest = new File(uploadPath + relativePath + "/" + newFileName);
        multipartFile.transferTo(dest);
    }
}
