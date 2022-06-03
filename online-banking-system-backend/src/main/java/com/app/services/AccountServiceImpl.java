package com.app.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AccountRepositry;
import com.app.dao.TransactionRepositry;
import com.app.dto.AccountDto;
import com.app.pojos.Account;
import com.app.pojos.AccountType;
import com.app.pojos.Transaction;
import com.app.pojos.TransactionStatus;
import com.app.pojos.User;

@Service
@Transactional
public class AccountServiceImpl implements IAccountImpl {

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

}
