package com.app.services;

import java.io.FileNotFoundException;
import java.util.List;

import com.app.pojos.Transaction;


public interface ITransactionService {

	List<Transaction> getTransactionListByAccountNumber(long accountNo);
	
	byte[] generateTransactionReport(long accountNo) throws FileNotFoundException;
	
}
