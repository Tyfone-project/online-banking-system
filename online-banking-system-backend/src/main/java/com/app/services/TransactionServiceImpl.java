package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.TransactionRepositry;
import com.app.dto.ChartDataDTO;
import com.app.dto.ChartRequestDto;
import com.app.dto.ITransactionDto;
import com.app.dto.IMoneySpentInMonthDto;

@Service
@Transactional
public class TransactionServiceImpl implements ITransactionService {

	@Autowired
	private TransactionRepositry transactionRepo;
	
	@Override
	public List<ITransactionDto> getTransactionListByAccountNumber(long accountNo) {
		return transactionRepo.findByAccountNo(accountNo);
	}

	@Override
	public ChartDataDTO getMoneySpentByMonth(ChartRequestDto chartRequest) {
		List<IMoneySpentInMonthDto> moneySpentByMonth = transactionRepo.getMoneySpentByMonth(chartRequest.getAccountNumber(),chartRequest.getFrom(), chartRequest.getTo());
		ChartDataDTO chartData = new ChartDataDTO();
		moneySpentByMonth.forEach((dto)->{
			chartData.getLabels().add(dto.getMonth());
			chartData.getData().add(dto.getAmount());
		});
		return chartData;
	}

}
