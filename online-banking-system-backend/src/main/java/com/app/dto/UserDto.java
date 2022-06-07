package com.app.dto;

import java.util.List;
import java.util.Optional;

import com.app.pojos.Account;
import com.app.pojos.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {

	private List<Account> accounts;

	private Optional<User> user;
}
