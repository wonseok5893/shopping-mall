package com.project.shoppingmall.repository.product;

import com.project.shoppingmall.controller.requestdto.product.RequestFindAllProducts;
import com.project.shoppingmall.controller.responsedto.file.ResponseFile;
import com.project.shoppingmall.controller.responsedto.product.ResponseProduct;
import com.project.shoppingmall.domain.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ProductQueryRepository {

    private final EntityManager em;

    public List<ResponseProduct> findAllByPagingAndSorting(RequestFindAllProducts requestFindAllProducts) {
        List<ResponseProduct> products = findProducts(requestFindAllProducts);
        Map<Long, List<ResponseFile>> fileMap = findFileMap(toProductIds(products));
        System.out.println(fileMap.size());
        products.forEach(product -> product.setImageFiles(fileMap.get(product.getId())));
        return products;
    }

    private Map<Long, List<ResponseFile>> findFileMap(List<Long> productIds) {
        List<ResponseFile> files = em.createQuery("select new com.project.shoppingmall.controller.responsedto.file.ResponseFile(f.filePath,f.product.id)" +
                " from File f" +
                " where f.product.id in :productIds", ResponseFile.class)
                .setParameter("productIds", productIds)
                .getResultList();
        return files.stream().collect(Collectors.groupingBy(file -> file.getProductId()));
    }

    private List<Long> toProductIds(List<ResponseProduct> products) {
        return products.stream().map(p -> p.getId()).collect(Collectors.toList());
    }

    public List<ResponseProduct> findProducts(RequestFindAllProducts requestFindAllProducts) {
        return em.createQuery("select new com.project.shoppingmall.controller.responsedto.product.ResponseProduct(p.id, p.name, p.description, p.price, p.stock, c.id, c.name)" +
                " from Product p" +
                " join p.category c"
                , ResponseProduct.class)
                .setFirstResult(requestFindAllProducts.getPageNum() * requestFindAllProducts.getSize())
                .setMaxResults(requestFindAllProducts.getSize())
                .getResultList();
    }


}
