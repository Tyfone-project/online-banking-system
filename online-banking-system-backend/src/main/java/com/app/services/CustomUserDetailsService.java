package com.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.UserRepository;
import com.app.pojos.CustomUserDetails;
import com.app.pojos.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		long customerId = Long.parseLong(username);
		User user = userRepo.findByCustomerId(customerId).orElseThrow(()->new ResourceNotFoundException("User not found!"));
		return new CustomUserDetails(user);
	}

}
