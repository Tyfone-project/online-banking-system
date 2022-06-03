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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AccountDto;
import com.app.services.IAccountService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/accounts")
public class AccountController {

	@Autowired
	private IAccountService accountService;
	
	@GetMapping("/{customerId}")
	
	public ResponseEntity<?> accountList(@PathVariable long customerId){
		return new ResponseEntity<>(accountService.retrieveAllAccountsByCustomerId(customerId),HttpStatus.OK);
	}

	@PostMapping("/addAccount")
	public ResponseEntity<?> addAccount(@RequestBody AccountDto request) {
		System.out.println(request);
		return new ResponseEntity<>(accountService.saveAccount(request), HttpStatus.CREATED);
	}

	
}
