package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AccountLoginDto;
import com.app.services.IAccountService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private IAccountService accountService;

	@PostMapping("/logintoaccount")
	public ResponseEntity<?> processAccountLogin(@RequestBody AccountLoginDto accountLogin, Authentication auth) {
		try {
			log.info(accountLogin.getAccountNumber() + " | " + accountLogin.getPin());
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(accountService.loginToAccount(accountLogin.getAccountNumber(), accountLogin.getPin(), auth));
		} catch (Exception e) {
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}
