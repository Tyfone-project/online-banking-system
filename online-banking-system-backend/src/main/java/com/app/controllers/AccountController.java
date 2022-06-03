package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.TransferFundsDto;
import com.app.services.IAccountImpl;
import com.app.services.ITransactionImpl;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:3000/")
public class AccountController {

	@Autowired
	private IAccountImpl accountService;

	@Autowired
	private ITransactionImpl transactionService;

	@PostMapping("/transferfunds")
	public ResponseEntity<?> processTransferFunds(@RequestBody TransferFundsDto transferFundsDetails) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(accountService.transferFunds(transferFundsDetails.getSenderAccountNumber(),
							transferFundsDetails.getReceiverAccountNumber(), transferFundsDetails.getAmountToTransfer(),
							transferFundsDetails.getDateOfTransaction()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping("/transactionslist/{accountNumber}")
	public ResponseEntity<?> getListofTransaction(@PathVariable long accountNumber) {
		return new ResponseEntity<>(transactionService.getTransactionListByAccountNumber(accountNumber), HttpStatus.OK);
	}
}
