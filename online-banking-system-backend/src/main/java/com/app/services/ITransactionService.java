package com.app.services;

import java.io.FileNotFoundException;
import java.util.List;

import com.app.dto.ITransactionDto;


public interface ITransactionService {

	List<ITransactionDto> getTransactionListByAccountNumber(long accountNo);
	
	byte[] generateTransactionReport(long accountNo) throws FileNotFoundException;
	
}
