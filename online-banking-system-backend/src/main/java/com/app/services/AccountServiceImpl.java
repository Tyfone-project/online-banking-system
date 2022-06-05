package com.app.services;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AccountRepositry;
import com.app.dao.TransactionRepositry;
import com.app.dao.UserRepository;
import com.app.dto.AccountDto;
import com.app.pojos.Account;
import com.app.pojos.AccountType;
import com.app.pojos.Transaction;
import com.app.pojos.TransactionStatus;
import com.app.pojos.User;

@Service
@Transactional
public class AccountServiceImpl implements IAccountService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private AccountRepositry accountRepo;

	@Autowired
	private TransactionRepositry transactionRepo;

	@Override
	public Account transferFunds(long senderAccountNumber, long receiverAccountNumber, BigDecimal amountToTransfer,
			LocalDate amountTransferDate) {

		Account receiverAccountObject = accountRepo.findByAccountNo(receiverAccountNumber)
				.orElseThrow(() -> new RuntimeException("Invalid Account Number!!!"));

		Account senderAccountObject = accountRepo.findByAccountNo(senderAccountNumber)
				.orElseThrow(() -> new RuntimeException("Invalid Account Number!!!"));
		
		if (senderAccountObject.getBalance().compareTo(BigDecimal.ZERO) > 0) {
			senderAccountObject.setBalance(senderAccountObject.getBalance().subtract(amountToTransfer));
			receiverAccountObject.setBalance(receiverAccountObject.getBalance().add(amountToTransfer));

			Transaction updatedTransactionObject = new Transaction(receiverAccountNumber, amountToTransfer,
					amountTransferDate, TransactionStatus.SUCCESS, senderAccountObject);

			transactionRepo.save(updatedTransactionObject);
			return receiverAccountObject;
		}
		throw new RuntimeException("Insufficient Funds!!!");
	}

	@Override
	public String saveAccount(AccountDto request, Principal principal) {
		System.out.println(request.getPin()+" "+request.getAccountType());
		long custId = Long.parseLong(principal.getName());
		User user  = userRepo.findById(custId).orElseThrow(
				() -> new RuntimeException("No customer exists with customer id: " + custId));
		
		Account account= new Account(request.getPin(),BigDecimal.ZERO,AccountType.valueOf(request.getAccountType().toUpperCase()), user);
		
		Account acc = accountRepo.save(account);	
		return "Account with Id: " + acc.getAccountNo() + " created successfully";
	}
 
	@Override
	public List<Account> retrieveAllAccountsByCustomerId(Principal principal) {
		long custId = Long.parseLong(principal.getName());
		return accountRepo.findByCustomerId(custId);
	}


}
