package com.app.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransferFundsDto {

	private long senderAccountNumber;
	private long receiverAccountNumber;
	private BigDecimal amountToTransfer;
	private LocalDate dateOfTransaction;
}
