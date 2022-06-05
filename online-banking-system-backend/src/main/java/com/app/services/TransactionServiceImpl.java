package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.TransactionRepositry;
import com.app.pojos.Transaction;

@Service
@Transactional
public class TransactionServiceImpl implements ITransactionImpl {

	@Autowired
	private TransactionRepositry transactionRepo;
	
	@Override
	public List<Transaction> getTransactionListByAccountNumber(long accountNo) {
		return transactionRepo.findByAccountNo(accountNo);
	}

}
