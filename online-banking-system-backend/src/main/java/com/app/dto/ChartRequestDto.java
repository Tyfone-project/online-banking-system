package com.app.dto;

import lombok.Data;

@Data
public class ChartRequestDto {

	private long accountNumber;
	private String from;
	private String to;
}
