package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")
public class User{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long customerId;
	
	@Column(name = "first_name", length = 20, nullable = false)
	private String firstName;
	
	@Column(name = "last_name", length = 20, nullable = false)
	private String lastName;
	
	@Email
	@Column(nullable = false, unique = true, length = 50)
	private String email;
	
	@Column(length = 20, nullable = false)
	@Pattern(regexp = "/^(?=.[0-9])(?=.[a-zA-Z])(?=.[!@#$%^&+-])([a-zA-Z0-9!@#$%^&*+-]{8,20})$/")
	private String password;
	
	@Column(nullable = false)
	@Length(min = 10, max = 10)
	private String phone;
	
	@Column(length = 100, nullable = false)
	private String address;
	
	@Past
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(nullable = false)
	private LocalDate dob;
	
	@Column(name = "aadhar_no", nullable = false)
	@Length(min = 12, max = 12)
	private String aadharNo;
	
	@Column(name = "pan_no", nullable = false)
	@Length(min = 10, max=10)
	private String panNo;
	
	@Lob
	@Column(name = "profile_picture")
	private byte[] profilePicture;

}
