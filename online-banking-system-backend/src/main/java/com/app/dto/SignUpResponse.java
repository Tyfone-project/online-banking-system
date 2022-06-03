package com.app.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class SignUpResponse {

    private long customerId;
    private String firstName;
    private String lastName;
    private String password;
    private String phone;
    private LocalDate dob;
    private String address;
    private String aadharNo;
    private String panNo;
    private String email;
    private String roles;
    
}