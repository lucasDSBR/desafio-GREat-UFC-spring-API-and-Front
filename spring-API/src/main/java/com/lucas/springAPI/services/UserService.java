package com.lucas.springAPI.services;

import java.util.Date;
import java.util.InputMismatchException;
import java.util.Optional;

import org.hibernate.hql.spi.id.inline.InlineIdsSubSelectValueListBulkIdStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.lucas.springAPI.domain.seletores.SearchUserSeletor;
import com.lucas.springAPI.model.entities.UserEntity;
import com.lucas.springAPI.model.repositories.UserRepository;
@Service
public class UserService {
	Date date = new Date();
	
	@Autowired
	private UserRepository userRepository;
	 
	
	public Iterable<UserEntity> searchUser(UserEntity filter) {
		if(filter.getNome() != "" && filter.getCpf() == "" && filter.getRg() == "")
			return userRepository.findByNomeContainingIgnoreCase(filter.getNome());
		if(filter.getNome() != "" && (filter.getCpf() != "" || filter.getRg() == ""))
			return userRepository.findByNomeAndCpf(filter.getNome(), filter.getCpf());
		if(filter.getNome() != "" && (filter.getCpf() == "" || filter.getRg() != ""))
			return userRepository.findByNomeAndRg(filter.getNome(), filter.getRg());
		if(filter.getNome() == "" && (filter.getCpf() != "" || filter.getRg() != ""))
			return userRepository.findByCpfOrRg(filter.getCpf(), filter.getRg());
		else
			return null;
	}
	
	
	
	public UserEntity registerAndUpdateUser(UserEntity dataUser) {
		if(isCPF(dataUser.getCpf())) {
			return userRepository.save(dataUser);
		}else {
			throw new RuntimeException("O CPF informado não se encontra com os padrões de conformidade.");
		}
		
	}
	
	public void deleteUser(int idUser) {
		userRepository.deleteById(idUser);
	}
	
	public Optional<UserEntity> getUserForId(int idUser) {
		return userRepository.findById(idUser);
	}
	
	
	
	public Page<UserEntity> getUserForPagination(int numPage) {
		Pageable page = PageRequest.of(numPage, 6);
		return userRepository.findAll(page);
	}
	
	public Iterable<UserEntity> usersForNameMorePagination(String partName) {
		return userRepository.findByNomeContainingIgnoreCase(partName);
	}
	
    public static boolean isCPF(String CPF) {
        // considera-se erro CPF's formados por uma sequencia de numeros iguais
        if (CPF.equals("00000000000") ||
            CPF.equals("11111111111") ||
            CPF.equals("22222222222") || CPF.equals("33333333333") ||
            CPF.equals("44444444444") || CPF.equals("55555555555") ||
            CPF.equals("66666666666") || CPF.equals("77777777777") ||
            CPF.equals("88888888888") || CPF.equals("99999999999") ||
            (CPF.length() != 11))
            return(false);

        char dig10, dig11;
        int sm, i, r, num, peso;

        // "try" - protege o codigo para eventuais erros de conversao de tipo (int)
        try {
        // Calculo do 1o. Digito Verificador
            sm = 0;
            peso = 10;
            for (i=0; i<9; i++) {
        // converte o i-esimo caractere do CPF em um numero:
        // por exemplo, transforma o caractere '0' no inteiro 0
        // (48 eh a posicao de '0' na tabela ASCII)
            num = (int)(CPF.charAt(i) - 48);
            sm = sm + (num * peso);
            peso = peso - 1;
            }

            r = 11 - (sm % 11);
            if ((r == 10) || (r == 11))
                dig10 = '0';
            else dig10 = (char)(r + 48); // converte no respectivo caractere numerico

        // Calculo do 2o. Digito Verificador
            sm = 0;
            peso = 11;
            for(i=0; i<10; i++) {
            num = (int)(CPF.charAt(i) - 48);
            sm = sm + (num * peso);
            peso = peso - 1;
            }

            r = 11 - (sm % 11);
            if ((r == 10) || (r == 11))
                 dig11 = '0';
            else dig11 = (char)(r + 48);

        // Verifica se os digitos calculados conferem com os digitos informados.
            if ((dig10 == CPF.charAt(9)) && (dig11 == CPF.charAt(10)))
                 return(true);
            else return(false);
                } catch (InputMismatchException erro) {
                return(false);
            }
        }

}
