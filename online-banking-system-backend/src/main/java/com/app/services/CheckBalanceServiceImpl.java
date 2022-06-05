package com.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CheckBalanceRepository;

@Service
public class CheckBalanceServiceImpl implements ICheckBalanceService{
	@Autowired
	CheckBalanceRepository checkBalanceRepository;

	@Override
	public String CheckPassword(int userId, String password) {
		String authUser = checkBalanceRepository.checkPassword(userId, password);
		if(authUser == null)
			return "Invalid Password";
		else if(authUser.equals(password)) {
			double balance = CheckBalance(userId);
			return "You Balance is : "+balance;
		}
			return "";
	} //end of CheckPassword()

	@Override
	public double CheckBalance(int userId) {
		return checkBalanceRepository.getBalance(userId);
	} //end of CheckBalance()
} //end of CheckBalanceService Class