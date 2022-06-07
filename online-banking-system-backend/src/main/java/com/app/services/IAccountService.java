package com.app.services;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;

import com.app.dto.AccountDashboardDto;
import com.app.dto.AccountDto;
import com.app.dto.SignInResponse;
import com.app.dto.UserDto;
import com.app.pojos.Account;
import com.app.pojos.User;

public interface IAccountService {
	
	public String saveAccount(AccountDto request, Principal principal);

	public UserDto retrieveAllAccountsByCustomerId(Principal principal);
	
	Account transferFunds(long senderAccountNumber, long receiverAccountNumber, BigDecimal amountToTransfer,
			LocalDate transferDate);
	
	public SignInResponse loginToAccount(long accountNumber, String pin);
	
	public AccountDashboardDto getAccountDashboard(long accountNumber);

	
}
