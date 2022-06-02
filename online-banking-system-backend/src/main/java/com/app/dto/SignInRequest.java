package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInRequest {
	
	private long customerId;
	private String password;
}
