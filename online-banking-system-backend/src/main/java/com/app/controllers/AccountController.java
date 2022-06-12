package com.app.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

import lombok.extern.slf4j.Slf4j;

@Slf4j
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
		log.info(principal.toString());
		log.info(request.getAccountType() + " | " + request.getPin());
		return new ResponseEntity<>(accountService.saveAccount(request, principal), HttpStatus.CREATED);
	}

	@PostMapping("/transferfunds")
	public ResponseEntity<?> processTransferFunds(@RequestBody TransferFundsDto transferFundsDetails) {
		try {
			log.info(transferFundsDetails.getSenderAccountNumber() + " | "
					+ transferFundsDetails.getReceiverAccountNumber() + " | "
					+ transferFundsDetails.getAmountToTransfer() + " | " + transferFundsDetails.getDateOfTransaction());
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(accountService.transferFunds(transferFundsDetails.getSenderAccountNumber(),
							transferFundsDetails.getReceiverAccountNumber(), transferFundsDetails.getAmountToTransfer(),
							transferFundsDetails.getDateOfTransaction()));

		} catch (Exception e) {
			log.error(transferFundsDetails.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping("/transactionslist/{accountNumber}")
	public ResponseEntity<?> getListofTransaction(@PathVariable long accountNumber) {
		return new ResponseEntity<>(transactionService.getTransactionListByAccountNumber(accountNumber), HttpStatus.OK);
	}

	@PostMapping("/transactionsbymonth")
	public ResponseEntity<?> getMoneySpentByMonth(@RequestBody ChartRequestDto chartRequest) {
		return new ResponseEntity<>(transactionService.getMoneySpentByMonth(chartRequest), HttpStatus.OK);
	}

	@GetMapping(value = "/report/{accountNumber}", produces = { "application/pdf" })
	public ResponseEntity<?> generateReport(@PathVariable long accountNumber) throws IOException {
		transactionService.generateTransactionReport(accountNumber);
		File file = new File("TransactionReport.pdf");
		InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
		log.info("Report Generated For Account Number : "+accountNumber);
		return ResponseEntity.ok().contentLength(file.length()).contentType(MediaType.APPLICATION_PDF).body(resource);
	}

}
