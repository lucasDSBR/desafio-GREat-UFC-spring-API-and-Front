package com.lucas.springAPI.model.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.lucas.springAPI.model.entities.User;
/*
 * 
 * @author Lucas Maciel
 * 
 */
public interface UserRepository 
	extends PagingAndSortingRepository<User, Integer> {
	
	public Iterable<User> findByNomeContainingIgnoreCase(String name);
}
