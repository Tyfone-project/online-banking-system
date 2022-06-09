package com.app.services;

import java.io.IOException;
import java.time.LocalDate;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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

	@Autowired
	private JavaMailSender mailSender;

		public static int noOfQuickServiceThreads = 20;	
		private ScheduledExecutorService quickService = Executors.newScheduledThreadPool(noOfQuickServiceThreads); 
	
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
			e.printStackTrace();
		}

		User persistentUser = userRepo.save(user);
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(request.getEmail());
		mail.setSubject("Online Banking system registration completed successfully!!");
		mail.setText("Hello " + persistentUser.getFirstName() + ",\n"
				+ "You have successfully completed registration with online banking system, your Customer ID is  "
				+ persistentUser.getCustomerId()+"\n"+"Use this customer ID to login");

		quickService.submit(new Runnable() {
			@Override
			public void run() {
				try{
					mailSender.send(mail);
				}catch(Exception e){
					System.out.println(e.getMessage());	
				}
			}
		});
		
		SignUpResponse dto = new SignUpResponse();
		BeanUtils.copyProperties(persistentUser, dto);// for sending resp : copied User--->User resp DTO
		System.out.println(dto);
		return dto;
	}

}