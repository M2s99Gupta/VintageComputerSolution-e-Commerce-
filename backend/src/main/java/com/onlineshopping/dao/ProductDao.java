package com.onlineshopping.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlineshopping.model.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
	
//	List<Product> findByCategoryId(int category);
	List<Product> findByCategoryIdAndDeletedFalse(int categoryId);
	Optional<Product> findByIdAndDeletedFalse(int id);
	
	
	


	List<Product> findByDeletedFalse(); // For getAll



}
