package com.app.services;

import com.app.dto.SignUpRequest;
import com.app.dto.SignUpResponse;

public interface IUserService {
	SignUpResponse registerUser(SignUpRequest request);
}
