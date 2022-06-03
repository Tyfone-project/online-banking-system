package com.app.services;

import java.util.List;

import com.app.pojos.Transaction;

public interface ITransactionImpl {

	List<Transaction> getTransactionListByAccountNumber(long accountNo);
}
