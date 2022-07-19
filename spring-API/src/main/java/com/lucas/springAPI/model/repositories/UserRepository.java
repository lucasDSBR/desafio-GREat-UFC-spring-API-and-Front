package com.lucas.springAPI.model.repositories;

import java.util.Optional;

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
	
	public Iterable<UserEntity> findByCpfOrRg(String cpf, String rg);
	
	public Iterable<UserEntity> findByNomeAndCpf(String nome, String cpf);
	
	public Iterable<UserEntity> findByNomeAndRg(String nome, String rg);
	
	public Iterable<UserEntity> findByNomeAndCpfOrRg(String nome, String cpf, String rg);
	
}
