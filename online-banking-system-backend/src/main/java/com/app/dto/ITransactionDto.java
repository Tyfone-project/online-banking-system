package com.app.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.app.pojos.TransactionStatus;

public interface ITransactionDto {
	long getTransactionId();
	long getTransactionFrom();
	long getTransactionTo();
	BigDecimal getAmount();
	LocalDate getDate();
	TransactionStatus getTransactionStatus();
}
