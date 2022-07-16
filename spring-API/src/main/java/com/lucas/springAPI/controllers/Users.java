package com.lucas.springAPI.controllers;

import org.hibernate.annotations.Formula;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.springAPI.model.entities.User;
import com.lucas.springAPI.model.repositories.UserRepository;

import java.util.*;

/*
 * 
 * @author Lucas Maciel
 * 
 */
import javax.validation.Valid;
@RestController
public class Users {
	Date date = new Date();
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping(path = "/")
	public String main() {
		return "Você está em uma API REST desenvolvida com Spring.";
	}
	
//	@GetMapping(path = "/user")
//	public Iterable<User> getAllUsers() {
//		return userRepository.findAll();
//	}
	@GetMapping(path = "/name/{partName}")
	public Iterable<User> usersPagination(@PathVariable String partName) {
		return userRepository.findByNomeContainingIgnoreCase(partName);
	}
	
	@GetMapping(path = "/page/{numPage}")
	public Iterable<User> usersPagination(@PathVariable int numPage) {
		Pageable page = PageRequest.of(numPage, 10);
		return userRepository.findAll(page);
	}
	
	@GetMapping(path = "/user/{idUser}")
	public Optional<User> getUserId(@PathVariable int idUser) {
		return userRepository.findById(idUser);
	}
	
	@RequestMapping(method = {RequestMethod.POST, RequestMethod.PUT}, path = "/user")
	public User registerUser(@RequestBody User dataUser) {
		userRepository.save(dataUser);
		return dataUser;
	}
	
	@DeleteMapping(path = "/user/{idUser}")
	public void deleteUser(@PathVariable int idUser) {
		userRepository.deleteById(idUser);
	}
//	@PutMapping(path = "/user")
//	public User updateUser(@RequestBody User dataUser) {
//		userRepository.save(dataUser);
//		return dataUser;
//	}
	
	
}
