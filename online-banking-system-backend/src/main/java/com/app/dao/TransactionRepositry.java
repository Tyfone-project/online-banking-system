package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Transaction;

public interface TransactionRepositry extends JpaRepository<Transaction, Integer>{

	@Query("Select t from Transaction t where t.account.accountNo like :accountNumber")
	List<Transaction> findByAccountNo(@Param("accountNumber")long accountNo);
}
