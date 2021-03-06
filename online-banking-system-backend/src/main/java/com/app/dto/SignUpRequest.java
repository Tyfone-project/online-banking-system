package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

//signuprequestDto
@Data
@AllArgsConstructor
public class SignUpRequest {

	private String firstName;
	private String lastName;
	private String password;
	private String phone;
	private String dob;
	private String address;
	private String aadharNo;
	private String panNo;
	private String email;
	private String roles;

}