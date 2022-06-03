package com.app.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AccountDto {

	//private long accountNo;
	
	private String pin;

	//private BigDecimal balance;

	private String accountType;

	private long customerId;

	public AccountDto(String pin, String accountType) {
		super();
		this.pin = pin;
		this.accountType = accountType;
	}

//	public AccountDto(long accountNo, String pin, BigDecimal balance, String accountType) {
//		super();
//		this.accountNo = accountNo;
//		this.pin = pin;
//		this.balance = balance;
//		this.accountType = accountType;
//	}
	
	
	
}

