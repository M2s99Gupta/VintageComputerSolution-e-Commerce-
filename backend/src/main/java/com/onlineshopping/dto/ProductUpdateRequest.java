package com.onlineshopping.dto;

import java.math.BigDecimal;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.onlineshopping.model.Product;

public class ProductUpdateRequest {
    
    private int id;
    private String title;
    private String description;
    private int quantity;
    private BigDecimal price;
    private int categoryId;
    private MultipartFile image;

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    public MultipartFile getImage() {
        return image;
    }
    public void setImage(MultipartFile image) {
        this.image = image;
    }
    public int getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    // Convert DTO to Entity (without image and category to be handled separately)
    public static Product toEntity(ProductUpdateRequest dto){
        Product entity = new Product();
        BeanUtils.copyProperties(dto, entity, "image", "categoryId");
        return entity;
    }

    @Override
    public String toString() {
        return "ProductAddRequest [id=" + id + ", title=" + title + ", description=" + description + ", quantity="
                + quantity + ", price=" + price + ", categoryId=" + categoryId;
    }
}
