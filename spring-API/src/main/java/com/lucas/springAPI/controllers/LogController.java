package com.lucas.springAPI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.springAPI.model.entities.LogEntity;
import com.lucas.springAPI.model.repositories.LogRepository;
import com.lucas.springAPI.services.LogService;
import com.lucas.springAPI.services.UserService;

import java.util.*;

/*
 * 
 * @author Lucas Maciel
 * 
 */

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class LogController {
	Date date = new Date();
	
	@Autowired
	private LogRepository logsRepository;
	@Autowired
	private LogService logService;
	
	@GetMapping(path = "/logs")
	public Iterable<LogEntity> getAllLogs() {
		return logService.getLogs();
	}
	@RequestMapping(method = {RequestMethod.POST, RequestMethod.PUT}, path = "/logs")
	public LogEntity registerUser(@RequestBody LogEntity dataLog) {
		return logService.registerLog(dataLog);
	}

}
