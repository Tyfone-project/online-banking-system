package com.app.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountDashboardDto {
	private BigDecimal balance;
	private List<ITransactionDto> recentTransactions;
	private BigDecimal moneySpentThisMonth;
}
