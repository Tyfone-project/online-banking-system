package com.app.dao;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.dto.IMoneySpentInMonthDto;
import com.app.dto.ITransactionDto;
import com.app.pojos.Transaction;

public interface TransactionRepositry extends JpaRepository<Transaction, Integer> {

    @Query("Select t.id as transactionId, t.account.accountNo AS transactionFrom, t.transactionTo as transactionTo, t.amount as amount , t.date as date , t.transactionStatus as transactionStatus from Transaction t where t.account.accountNo like :accountNumber or t.transactionTo =:accountNumber")
    List<ITransactionDto> findByAccountNo(@Param("accountNumber") long accountNo);

    @Query(value="select transaction_id AS transactionId, transaction_from as transactionFrom, transaction_to as transactionTo, amount, date, transaction_Status as transactionStatus FROM transactions where transaction_from=:accountNumber or transaction_to=:accountNumber ORDER BY date DESC LIMIT 5", nativeQuery = true)
    List<ITransactionDto> findRecentTransactions(@Param("accountNumber") long accountNumber);

    @Query(value="select SUM(amount) from transactions where transaction_from=:accountNumber and SUBSTRING(date,1,7)=SUBSTRING(curdate(),1,7)", nativeQuery = true)
    BigDecimal getMoneySpentThisMonth(@Param("accountNumber") long accountNumber);
    
    @Query(value="select concat(MONTHNAME(date),\" \",YEAR(date)) as month, SUM(amount) as amount from transactions where transaction_from=:accountNumber and date between :from and :to group by month",nativeQuery = true)
    List<IMoneySpentInMonthDto> getMoneySpentByMonth(@Param("accountNumber")long accountNumber, @Param("from") String from, @Param("to") String to);
}
