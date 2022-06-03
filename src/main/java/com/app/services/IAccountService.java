package com.app.services;

import java.util.List;

import com.app.dto.AccountDto;
import com.app.pojos.Account;

public interface IAccountService {
	
	public String saveAccount(AccountDto request);

	public List<Account> retrieveAllAccountsByCustomerId(long customerId);

}
