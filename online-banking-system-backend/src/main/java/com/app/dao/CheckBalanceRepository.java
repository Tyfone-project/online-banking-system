package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.User;

public interface CheckBalanceRepository extends JpaRepository<User, Integer>{
	
	@Query(value = "SELECT users.password from Users users where users.id = :id and users.password = :password", nativeQuery = true)
	public String checkPassword(@Param("id") int id, @Param("password") String password);
	
	@Query(value = "SELECT balance from accounts accounts where accounts.user_id = :userId", nativeQuery=true)
	public double getBalance(@Param("userId") int userId);
	
}