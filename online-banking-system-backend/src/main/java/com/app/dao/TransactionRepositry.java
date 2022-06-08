package com.app.dao;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.dto.ITransactionDto;
import com.app.pojos.Transaction;

public interface TransactionRepositry extends JpaRepository<Transaction, Integer> {

	@Query("Select t from Transaction t where t.account.accountNo like :accountNumber")
	List<Transaction> findByAccountNo(@Param("accountNumber") long accountNo);

	@Query(value="select transaction_id AS transactionId, transaction_from as transactionFrom, transaction_to as transactionTo, amount, date, transaction_Status as transactionStatus FROM transactions ORDER BY date DESC LIMIT 5", nativeQuery = true)
	List<ITransactionDto> findRecentTransactions(@Param("accountNo") long accountNumber);
	
	@Query(value="select SUM(amount) from transactions where transaction_from=:accountNumber and SUBSTRING(date,6,2)=SUBSTRING(curdate(),6,2)", nativeQuery = true)
	BigDecimal getMoneySpentThisMonth(@Param("accountNumber") long accountNumber);
}
