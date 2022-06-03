package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Account;

public interface IAccountRepository extends JpaRepository<Account, Long> {

	@Query( "select a from Account a where a.user.customerId=:customerId")
	List<Account> findByCustomerId(long customerId);

}
