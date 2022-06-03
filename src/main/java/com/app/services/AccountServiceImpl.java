package com.app.services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.IAccountRepository;
import com.app.dao.IUserRepository;
import com.app.dto.AccountDto;
import com.app.pojos.Account;
import com.app.pojos.AccountType;
import com.app.pojos.User;

@Transactional
@Service
public class AccountServiceImpl implements IAccountService {

	@Autowired
	private IAccountRepository accountRepo;
	
	@Autowired
	private IUserRepository userRepo;

	@Override
	public String saveAccount(AccountDto request) {
		User user  = userRepo.findById(request.getCustomerId()).orElseThrow(
				() -> new RuntimeException("No customer exists with customer id: " + request.getCustomerId()));
		
		Account account= new Account(request.getPin(),BigDecimal.ZERO,AccountType.valueOf(request.getAccountType().toUpperCase()), user);
		
		Account acc = accountRepo.save(account);	
		return "Account with Id: " + acc.getAccountNo() + " created successfully";
	}
 
	@Override
	public List<Account> retrieveAllAccountsByCustomerId(long customerId) {
		return accountRepo.findByCustomerId(customerId);
	}

}
