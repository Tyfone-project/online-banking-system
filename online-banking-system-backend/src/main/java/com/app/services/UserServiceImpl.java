package com.app.services;

import java.io.IOException;
import java.time.LocalDate;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.UserRepository;
import com.app.dto.SignUpRequest;
import com.app.dto.SignUpResponse;
import com.app.pojos.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public SignUpResponse registerUser(SignUpRequest request, MultipartFile image) {
		User user = new User();
		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setPassword(encoder.encode(request.getPassword()));// set encoded pwd
		user.setPhone(request.getPhone());
		user.setDob(LocalDate.parse(request.getDob()));
		user.setAddress(request.getAddress());
		user.setAadharNo(request.getAadharNo());
		user.setPanNo(request.getPanNo());
		user.setEmail(request.getEmail());
		user.setRoles(request.getRoles());
		try {
			user.setProfilePicture(image.getBytes());
		} catch (IOException e) {
			throw new RuntimeException("Error saving image");
		}
		
		User persistentUser = userRepo.save(user);
		SignUpResponse dto = new SignUpResponse();
		BeanUtils.copyProperties(persistentUser, dto);// for sending resp : copied User--->User resp DTO
		System.out.println(dto);
		return dto;
	}

}