package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CheckBalanceDTO;
import com.app.services.ICheckBalanceService;
@CrossOrigin
@RestController
public class CheckBalanceController {
	@Autowired
	ICheckBalanceService iCheckBalance; 
	
	@PostMapping("/checkPassword")
	public ResponseEntity<?> checkPassword(@RequestBody CheckBalanceDTO checkBalanceDTO) {
		return new ResponseEntity<>(iCheckBalance.CheckPassword(checkBalanceDTO.getUserId(), checkBalanceDTO.getPassword()), HttpStatus.OK);
	} //end of checkPassword
}