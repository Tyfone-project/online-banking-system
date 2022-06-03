package com.app.services;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.app.pojos.Account;

public interface IAccountImpl {

	Account transferFunds(long senderAccountNumber, long receiverAccountNumber, BigDecimal amountToTransfer,
			LocalDate transferDate);
}
