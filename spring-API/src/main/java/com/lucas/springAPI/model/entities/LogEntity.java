package com.lucas.springAPI.model.entities;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/*
 * 
 * @author Lucas Maciel
 * 
 */

@Entity
public class LogEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String cpfUsuarioAlterado;
	private String acao;
	private Date dataLog;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCpfUsuarioAlterado() {
		return cpfUsuarioAlterado;
	}
	public void setCpfUsuarioAlterado(String cpfUsuarioAlterado) {
		this.cpfUsuarioAlterado = cpfUsuarioAlterado;
	}
	public String getAcao() {
		return acao;
	}
	public void setAcao(String acao) {
		this.acao = acao;
	}
	public Date getDataLog() {
		return dataLog;
	}
	public void setDataLog(Date dataLog) {
		this.dataLog = dataLog;
	}
	
	
}
