package com.app.dto;

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

//	public AccountDto(long accountNo, String pin, BigDecimal balance, String accountType) {
//		super();
//		this.accountNo = accountNo;
//		this.pin = pin;
//		this.balance = balance;
//		this.accountType = accountType;
//	}
	
}

