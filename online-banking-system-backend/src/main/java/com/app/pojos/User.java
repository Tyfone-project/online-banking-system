package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")

public class User {

	@Id
	@GenericGenerator(name = "my_gen", strategy = "com.app.pojos.CustomIdGen")
	@GeneratedValue(generator = "my_gen")
	private Long customerId;

	@Column(length = 20, nullable = false)
	private String firstName;

	@Column(length = 20, nullable = false)
	private String lastName;

	@Email
	@Column(nullable = false, unique = true, length = 50)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false, unique = true)
	private String phone;

	@Column(length = 100, nullable = false)
	private String address;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(nullable = false)
	private LocalDate dob;

	@Column(nullable = false)
	private String aadharNo;

	@Column(nullable = false)
	private String panNo;

	private String roles;

    @Lob
    @Column(name = "profile_picture")
    private byte[] profilePicture;

}