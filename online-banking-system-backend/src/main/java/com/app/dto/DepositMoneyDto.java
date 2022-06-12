package com.app.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class DepositMoneyDto {
 
	private long accountNo;
	private BigDecimal balance;
	
}