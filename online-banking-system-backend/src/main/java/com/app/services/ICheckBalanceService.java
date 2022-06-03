package com.app.services;

public interface ICheckBalanceService {
	public String CheckPassword(int userId, String password);
	
	public double CheckBalance(int userId);
}
