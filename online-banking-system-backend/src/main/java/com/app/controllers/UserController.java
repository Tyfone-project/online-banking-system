package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AccountLoginDto;
import com.app.services.IAccountService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private IAccountService accountService;

    @PostMapping("/logintoaccount")
    public ResponseEntity<?> processAccountLogin(@RequestBody AccountLoginDto accountLogin) {
        try {
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(accountService.loginToAccount(accountLogin.getAccountNumber(), accountLogin.getPin()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}