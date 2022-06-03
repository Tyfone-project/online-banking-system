package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
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
public class User extends BaseEntity {
	
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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public String getAadharNo() {
		return aadharNo;
	}

	public void setAadharNo(String aadharNo) {
		this.aadharNo = aadharNo;
	}

	public String getPanNo() {
		return panNo;
	}

	public void setPanNo(String panNo) {
		this.panNo = panNo;
	}

	public byte[] getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(byte[] profilePicture) {
		this.profilePicture = profilePicture;
	}

}
