package com.app.dto;

import com.app.pojos.AccountType;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserAccountDto {
	private long accountNo;
	private String accountType;
}
