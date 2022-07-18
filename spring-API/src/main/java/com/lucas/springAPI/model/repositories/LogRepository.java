package com.lucas.springAPI.model.repositories;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.lucas.springAPI.model.entities.LogEntity;
/*
 * 
 * @author Lucas Maciel
 * 
 */
public interface LogRepository extends PagingAndSortingRepository <LogEntity, Integer>{

}
