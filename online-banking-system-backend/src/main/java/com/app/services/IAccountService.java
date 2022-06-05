package com.app.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.app.dto.AccountDto;
import com.app.pojos.Account;

public interface IAccountService {
	
	public String saveAccount(AccountDto request);

	public List<Account> retrieveAllAccountsByCustomerId(long customerId);
	
	Account transferFunds(long senderAccountNumber, long receiverAccountNumber, BigDecimal amountToTransfer,
			LocalDate transferDate);

}