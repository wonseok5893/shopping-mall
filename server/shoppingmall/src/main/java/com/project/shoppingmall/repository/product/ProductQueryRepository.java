package com.project.shoppingmall.repository.product;

import com.project.shoppingmall.controller.requestdto.product.RequestFindProducts;
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

    public List<ResponseProduct> findAllByPagingAndSorting(RequestFindProducts requestFindProducts) {
        List<ResponseProduct> products = findResponseProducts(requestFindProducts);
        Map<Long, List<ResponseFile>> fileMap = findFileMap(responseProductToProductIds(products));
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

    private List<Long> responseProductToProductIds(List<ResponseProduct> products) {
        return products.stream().map(p -> p.getId()).collect(Collectors.toList());
    }

    public List<ResponseProduct> findResponseProducts(RequestFindProducts requestFindProducts) {
        return em.createQuery("select new com.project.shoppingmall.controller.responsedto.product.ResponseProduct(p.id, p.name, p.description, p.price, p.stock, c.id, c.name)" +
                " from Product p" +
                " join p.category c"
                , ResponseProduct.class)
                .setFirstResult(requestFindProducts.getPageNum() * requestFindProducts.getSize())
                .setMaxResults(requestFindProducts.getSize())
                .getResultList();
    }


    public List<ResponseProduct> findProducts(RequestFindProducts request) {
        List<ResponseProduct> products = findProductsByTitle(request);
        Map<Long, List<ResponseFile>> fileMap = findFileMap(responseProductToProductIds(products));
        products.forEach(product -> product.setImageFiles(fileMap.get(product.getId())));
        return products;
    }

    private List<ResponseProduct> findProductsByTitle(RequestFindProducts request) {
        return em.createQuery("select new com.project.shoppingmall.controller.responsedto.product.ResponseProduct(p.id, p.name, p.description, p.price, p.stock, c.id, c.name)" +
                " from Product p" +
                " join p.category c" +
                " where p.name like concat('%',:searchingBy,'%')"+
                " order by concat('p.',:sortedBy) desc", ResponseProduct.class)
                .setParameter("searchingBy", request.getSearchingBy())
                .setParameter("sortedBy", request.getSortedBy())
                .setFirstResult(request.getPageNum() * request.getSize())
                .setMaxResults(request.getSize())
                .getResultList();
    }

    public List<ResponseProduct> findProductsByCategory(RequestFindProducts request) {
        List<ResponseProduct> products = findProductsByCategoryIdAndTitle(request);
        Map<Long, List<ResponseFile>> fileMap = findFileMap(responseProductToProductIds(products));
        products.forEach(product -> product.setImageFiles(fileMap.get(product.getId())));
        return products;
    }

    private List<ResponseProduct> findProductsByCategoryIdAndTitle(RequestFindProducts request) {
        return em.createQuery("select new com.project.shoppingmall.controller.responsedto.product.ResponseProduct(p.id, p.name, p.description, p.price, p.stock, c.id, c.name)" +
                " from Product p" +
                " join p.category c" +
                " where c.id = :categoryId" +
                " and p.name like concat('%',:searchingBy,'%')"+
                " order by concat('p.',:sortedBy) desc", ResponseProduct.class)
                .setParameter("categoryId", request.getCategoryId())
                .setParameter("searchingBy", request.getSearchingBy())
                .setParameter("sortedBy", request.getSortedBy())
                .setFirstResult(request.getPageNum() * request.getSize())
                .setMaxResults(request.getSize())
                .getResultList();
    }
}
