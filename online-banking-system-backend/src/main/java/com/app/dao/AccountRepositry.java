package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Account;

public interface AccountRepositry extends JpaRepository<Account, Long>{
	
	@Query("Select a from Account a where a.accountNo like :accountNumber")
	Optional<Account> findByAccountNo(@Param("accountNumber") long accountNumber);

}
