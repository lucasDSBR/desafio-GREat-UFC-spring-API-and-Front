package com.lucas.springAPI.domain.seletores;

import java.util.Date;

import javax.persistence.Entity;


public class SearchUserSeletor {
	private String nomeSearch;
	private String cpfSearch;
	private Date rgSearch;
	
	public String getNome() {
		return nomeSearch;
	}
	public void setNome(String nome) {
		this.nomeSearch = nome;
	}
	public String getCpf() {
		return cpfSearch;
	}
	public void setCpf(String cpf) {
		this.cpfSearch = cpf;
	}
	public Date getRg() {
		return rgSearch;
	}
	public void setRg(Date rg) {
		this.rgSearch = rg;
	}
	
}
