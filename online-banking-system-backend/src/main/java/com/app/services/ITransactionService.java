package com.app.services;

import java.io.FileNotFoundException;
import java.io.OutputStream;
import java.util.List;

import com.app.dto.ChartDataDTO;
import com.app.dto.ChartRequestDto;
import com.app.dto.ITransactionDto;

public interface ITransactionService {

	List<ITransactionDto> getTransactionListByAccountNumber(long accountNo);
	
	ChartDataDTO getMoneySpentByMonth(ChartRequestDto chartRequest);
	
	OutputStream generateTransactionReport(long accountNo) throws FileNotFoundException;
	
}
