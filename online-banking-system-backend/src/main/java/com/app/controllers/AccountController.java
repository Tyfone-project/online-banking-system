package com.app.controllers;

import java.security.Principal;

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

import com.app.dto.AccountDto;
import com.app.dto.ChartRequestDto;
import com.app.dto.TransferFundsDto;
import com.app.services.IAccountService;
import com.app.services.ITransactionService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/accounts")
public class AccountController {

	@Autowired
	private IAccountService accountService;

	@Autowired
    private ITransactionService transactionService;

	@GetMapping
	public ResponseEntity<?> accountList(Principal principal) {
		return new ResponseEntity<>(accountService.retrieveAllAccountsByCustomerId(principal), HttpStatus.OK);
	}
	
	@GetMapping("/{accountNumber}")
	public ResponseEntity<?> accountDashboard(@PathVariable long accountNumber) {
		return new ResponseEntity<>(accountService.getAccountDashboard(accountNumber), HttpStatus.OK);
	}

	
	@PostMapping("/addAccount")
	public ResponseEntity<?> addAccount(@RequestBody AccountDto request, Principal principal) {
		System.out.println(request.getPin());
		return new ResponseEntity<>(accountService.saveAccount(request, principal), HttpStatus.CREATED);
	}

	@PostMapping("/transferfunds")
	public ResponseEntity<?> processTransferFunds(@RequestBody TransferFundsDto transferFundsDetails) {
		System.out.println("in TF controller");
		try {
			System.out.println("in TF controller try block");
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
	
	@PostMapping("/transactionsbymonth")
	public ResponseEntity<?> getMoneySpentByMonth(@RequestBody ChartRequestDto chartRequest){
		
		return new ResponseEntity<>(transactionService.getMoneySpentByMonth(chartRequest),HttpStatus.OK);
	}
	
}
