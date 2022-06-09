package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.TransactionRepositry;
import com.app.dto.ITransactionDto;

@Service
@Transactional
public class TransactionServiceImpl implements ITransactionService {

	@Autowired
	private TransactionRepositry transactionRepo;
	
	@Override
	public List<ITransactionDto> getTransactionListByAccountNumber(long accountNo) {
		return transactionRepo.findByAccountNo(accountNo);
	}

}
