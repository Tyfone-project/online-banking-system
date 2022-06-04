package com.app.dto;

import org.springframework.web.multipart.MultipartFile;

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
        private MultipartFile profilePicture;
        private String roles;
        
		public SignUpRequest(String firstName, String lastName, String password, String phone, String dob,
				String address, String aadharNo, String panNo, String email, MultipartFile profilePicture) {
			super();
			this.firstName = firstName;
			this.lastName = lastName;
			this.password = password;
			this.phone = phone;
			this.dob = dob;
			this.address = address;
			this.aadharNo = aadharNo;
			this.panNo = panNo;
			this.email = email;
			this.profilePicture = profilePicture;
		}
        
        
}