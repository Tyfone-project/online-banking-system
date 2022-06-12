package com.app.dao;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Account;

public interface AccountRepositry extends JpaRepository<Account, Long>{
	
	@Query("Select a from Account a where a.accountNo like :accountNumber")
	Optional<Account> findByAccountNo(@Param("accountNumber") long accountNumber);

	@Query( "select a from Account a where a.user.customerId=:customerId")
	List<Account> findByCustomerId(long customerId);
	
	@Modifying
	@Query("UPDATE Account A SET A.balance=:balance+A.balance WHERE A.accountNo=:accountNo")
	public void depositMoney(@Param("accountNo") long accountNo, @Param("balance") BigDecimal balance);
	
	@Query(value = "select u.phone from users u where u.customer_id = (select customer_id from accounts a where a.account_no =:accountNo)", nativeQuery = true)
	public long getPhoneNumber(@Param("accountNo") long accountNo);
		
}
