package com.app.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class ChartDataDTO {
	
	private List<BigDecimal> data;
	private List<String> labels;
	
	public ChartDataDTO(){
		data= new ArrayList<BigDecimal>();
		labels = new ArrayList<String>();
	}
}
