package com.app.services;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;

import com.app.dto.AccountDashboardDto;
import com.app.dto.AccountDto;
import com.app.dto.SignInResponse;
import com.app.dto.UserDto;
import com.app.pojos.Account;

public interface IAccountService {
	
	public String saveAccount(AccountDto request, Principal principal);

	public UserDto retrieveAllAccountsByCustomerId(Principal principal);
	
	Account transferFunds(long senderAccountNumber, long receiverAccountNumber, BigDecimal amountToTransfer,
			LocalDate transferDate);
	
	public SignInResponse loginToAccount(long accountNumber, String pin, Authentication auth);
	
	public AccountDashboardDto getAccountDashboard(long accountNumber);

	
}
