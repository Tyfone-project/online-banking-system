package com.app.services;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.security.core.Authentication;

import com.app.dto.AccountDto;
import com.app.dto.SignInResponse;
import com.app.pojos.Account;

public interface IAccountService {
	
	public String saveAccount(AccountDto request, Principal principal);

	public List<Account> retrieveAllAccountsByCustomerId(Principal principal);
	
	Account transferFunds(long senderAccountNumber, long receiverAccountNumber, BigDecimal amountToTransfer,
			LocalDate transferDate);
	
	public SignInResponse loginToAccount(long accountNumber, String pin);

}
