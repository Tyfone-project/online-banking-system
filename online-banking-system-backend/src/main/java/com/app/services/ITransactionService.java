package com.app.services;

import java.util.List;

import com.app.dto.ITransactionDto;

public interface ITransactionService {

	List<ITransactionDto> getTransactionListByAccountNumber(long accountNo);
	
}
