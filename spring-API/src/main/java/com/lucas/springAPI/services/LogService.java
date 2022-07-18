package com.lucas.springAPI.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lucas.springAPI.model.entities.UserEntity;
import com.lucas.springAPI.model.entities.LogEntity;
import com.lucas.springAPI.model.repositories.LogRepository;

@Service
public class LogService {
	Date date = new Date();
	@Autowired
	private LogRepository logsRepository;
	
	public Iterable<LogEntity> getLogs() {
		return logsRepository.findAll();
	}
	
	public LogEntity registerLog(LogEntity dataLog) {
		return logsRepository.save(dataLog);
	}
	
}
