package com.app.services;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.SignUpRequest;
import com.app.dto.SignUpResponse;

public interface IUserService {
	SignUpResponse registerUser(SignUpRequest request, MultipartFile image);
}
