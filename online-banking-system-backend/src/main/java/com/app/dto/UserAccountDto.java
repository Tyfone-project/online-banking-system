package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserAccountDto {
	private long accountNo;
	private String accountType;
}
