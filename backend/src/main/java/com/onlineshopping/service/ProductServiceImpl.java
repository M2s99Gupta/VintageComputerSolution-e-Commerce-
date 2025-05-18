package com.onlineshopping.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.onlineshopping.dao.ProductDao;
import com.onlineshopping.model.Product;
import com.onlineshopping.utility.StorageService;


@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired 
	private ProductDao productDao;
	
	@Autowired
	private StorageService storageService;
	
	


	@Override
	public void addProduct(Product product, MultipartFile productImmage) {
		
		String productImageName = storageService.store(productImmage);
		
		product.setImageName(productImageName);
		
		this.productDao.save(product);
	}
	
//	@Override
//	public boolean deleteProductById(int id) {
//	    if (productDao.existsById(id)) {
//	    	productDao.deleteById(id);
//	        return true;
//	    }
//	    return false;
//	}
	
	@Override
	public boolean deleteProductById(int id) {
	    Optional<Product> optionalProduct = productDao.findByIdAndDeletedFalse(id);
	    if (optionalProduct.isPresent()) {
	        Product product = optionalProduct.get();
	        
	        // Optionally delete image file
	        if (product.getImageName() != null) {
	            storageService.delete(product.getImageName());  // 🧹 Delete file from disk
	        }

	        product.setDeleted(true);
	        productDao.save(product);
	        return true;
	    }
	    return false;
	}



	
	public List<Product> getAllProducts() {
	    return productDao.findByDeletedFalse();
	}

	public List<Product> getProductsByCategory(int categoryId) {
	    return productDao.findByCategoryIdAndDeletedFalse(categoryId);
	}

	public Optional<Product> getProductById(int productId) {
	    return productDao.findByIdAndDeletedFalse(productId);
	}



}
