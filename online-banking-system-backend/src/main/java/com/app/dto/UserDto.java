package com.app.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {

	private List<UserAccountDto> accounts;
	
	private String name;

	private byte[] profilePicture;
}
