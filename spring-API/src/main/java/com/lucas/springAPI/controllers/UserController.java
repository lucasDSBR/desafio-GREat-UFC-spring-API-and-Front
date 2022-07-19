package com.lucas.springAPI.controllers;

import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.springAPI.domain.seletores.SearchUserSeletor;
import com.lucas.springAPI.model.entities.UserEntity;
import com.lucas.springAPI.model.repositories.UserRepository;
import com.lucas.springAPI.services.UserService;

import java.util.*;

/*
 * 
 * @author Lucas Maciel
 * 
 */

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class UserController {
	Date date = new Date();
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserService userService;
	
	@GetMapping(path = "/")
	public String main() {
		return "Você está em uma API REST desenvolvida com Spring.";
	}
	
	@GetMapping(path = "/name/{partName}")
	public Iterable<UserEntity> usersPagination(@PathVariable String partName) {
		return userService.usersForNameMorePagination(partName);
	}
	
	@GetMapping(path = "/page/{numPage}")
	public Page<UserEntity> usersPagination(@PathVariable int numPage) {
		return userService.getUserForPagination(numPage);
	}
	
	@GetMapping(path = "/user/{idUser}")
	public Optional<UserEntity> getUserId(@PathVariable int idUser) {
		return userService.getUserForId(idUser);
	}
	
	@RequestMapping(method = {RequestMethod.POST, RequestMethod.PUT}, path = "/user")
	public UserEntity registerUser(@RequestBody UserEntity dataUser) {
		return userService.registerAndUpdateUser(dataUser);
	}
	
	@PostMapping(path = "userFilter")
	public Iterable<UserEntity> userFilter(@RequestBody UserEntity filter) {
		
		return userService.searchUser(filter);
	}
	
	@DeleteMapping(path = "/user/{idUser}")
	public void deleteUser(@PathVariable int idUser) {
		userService.deleteUser(idUser);
	}
}
