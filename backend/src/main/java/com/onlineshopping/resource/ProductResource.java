package com.onlineshopping.resource;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.FileCopyUtils;

import com.onlineshopping.dao.CategoryDao;
import com.onlineshopping.dao.ProductDao;
import com.onlineshopping.dto.CommonApiResponse;
import com.onlineshopping.dto.ProductAddRequest;
import com.onlineshopping.dto.ProductResponse;
import com.onlineshopping.model.Category;
import com.onlineshopping.model.Product;
import com.onlineshopping.service.ProductService;
import com.onlineshopping.utility.StorageService;

@Component
public class ProductResource {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private StorageService storageService;

    public ResponseEntity<CommonApiResponse> addProduct(ProductAddRequest productDto) {
        CommonApiResponse response = new CommonApiResponse();

        if (productDto == null || !ProductAddRequest.validateProduct(productDto)) {
            response.setResponseMessage("Bad request - missing or invalid product data");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Optional<Category> optional = categoryDao.findById(productDto.getCategoryId());
        if (optional.isEmpty()) {
            response.setResponseMessage("Please select a valid product category");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Product product = ProductAddRequest.toEntity(productDto);
        product.setCategory(optional.get());

        try {
            productService.addProduct(product, productDto.getImage());
            response.setResponseMessage("Product added successfully!");
            response.setSuccess(true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        response.setResponseMessage("Failed to add product");
        response.setSuccess(false);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<ProductResponse> getAllProducts() {
        ProductResponse response = new ProductResponse();

        List<Product> products = productDao.findByDeletedFalse(); // ✅ Only non-deleted products

        if (CollectionUtils.isEmpty(products)) {
            response.setResponseMessage("No products found");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        response.setProducts(products);
        response.setResponseMessage("Products fetched successfully");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<ProductResponse> getProductById(int productId) {
        ProductResponse response = new ProductResponse();

        if (productId == 0) {
            response.setResponseMessage("Product ID is missing");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Optional<Product> optional = productDao.findByIdAndDeletedFalse(productId); // ✅ Only if not deleted

        if (optional.isEmpty()) {
            response.setResponseMessage("Product not found");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        response.setProducts(Arrays.asList(optional.get()));
        response.setResponseMessage("Product fetched successfully");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<?> getProductsByCategories(int categoryId) {
        ProductResponse response = new ProductResponse();

        if (categoryId == 0) {
            response.setResponseMessage("Category ID is missing");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Optional<Category> optional = categoryDao.findById(categoryId);
        if (optional.isEmpty()) {
            response.setResponseMessage("Category not found");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        List<Product> products = productDao.findByCategoryIdAndDeletedFalse(categoryId); // ✅ Filter deleted

        if (CollectionUtils.isEmpty(products)) {
            response.setResponseMessage("No products found for this category");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        response.setProducts(products);
        response.setResponseMessage("Products fetched successfully");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public void fetchProductImage(String productImageName, HttpServletResponse resp) {
        Resource resource = storageService.load(productImageName);
        if (resource != null) {
            try (InputStream in = resource.getInputStream()) {
                ServletOutputStream out = resp.getOutputStream();
                FileCopyUtils.copy(in, out);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public ResponseEntity<CommonApiResponse> updateProduct(ProductAddRequest productDto) {
        CommonApiResponse response = new CommonApiResponse();

        if (productDto == null || productDto.getId() == 0) {
            response.setResponseMessage("Bad request - Product ID is missing");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Optional<Product> optionalProduct = productDao.findByIdAndDeletedFalse(productDto.getId()); // ✅ Avoid updating deleted
        if (optionalProduct.isEmpty()) {
            response.setResponseMessage("Product not found or has been deleted");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        Product product = optionalProduct.get();

        if (!ProductAddRequest.validateProduct(productDto)) {
            response.setResponseMessage("Bad request - Missing required fields");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Update product details
        product.setTitle(productDto.getTitle());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setQuantity(productDto.getQuantity());

        Optional<Category> optionalCategory = categoryDao.findById(productDto.getCategoryId());
        if (optionalCategory.isEmpty()) {
            response.setResponseMessage("Invalid category selected");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        product.setCategory(optionalCategory.get());

        if (productDto.getImage() != null && !productDto.getImage().isEmpty()) {
            try {
                String imageName = storageService.store(productDto.getImage());
                product.setImageName(imageName);
            } catch (Exception e) {
                e.printStackTrace();
                response.setResponseMessage("Failed to upload image");
                response.setSuccess(false);
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        productDao.save(product);
        response.setResponseMessage("Product updated successfully");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
