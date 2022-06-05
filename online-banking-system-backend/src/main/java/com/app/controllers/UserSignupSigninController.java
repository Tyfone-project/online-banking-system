package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.SignInRequest;
import com.app.dto.SignInResponse;
import com.app.dto.SignUpRequest;
import com.app.jwt_utils.JwtUtils;
import com.app.services.IUserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserSignupSigninController {

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private IUserService userService;

	@PostMapping(value = "/signup", consumes = {"multipart/form-data"})
	public ResponseEntity<?> signUp(@RequestPart SignUpRequest request, @RequestPart MultipartFile image) {
		System.out.println("in user reg " + request);
		return new ResponseEntity<>(userService.registerUser(request, image), HttpStatus.CREATED);
	}

	@PostMapping("/signin")
	public ResponseEntity<?> logIn(@RequestBody SignInRequest request) {
		try {
			Authentication authenticatedUser = authManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getCustomerId(), request.getPassword()));
			// authentication success
			return ResponseEntity.ok(new SignInResponse(jwtUtils.generateJwtToken(authenticatedUser)));
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("User authentication failed", e);
		}
	}
}
