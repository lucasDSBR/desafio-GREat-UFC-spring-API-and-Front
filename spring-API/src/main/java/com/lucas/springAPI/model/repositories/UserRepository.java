package com.lucas.springAPI.model.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.lucas.springAPI.model.entities.UserEntity;
/*
 * 
 * @author Lucas Maciel
 * 
 */
public interface UserRepository 
	extends PagingAndSortingRepository<UserEntity, Integer> {
	
	public Iterable<UserEntity> findByNomeContainingIgnoreCase(String name);
}
