package com.app.services;

import java.io.IOException;
import java.sql.SQLException;

import javax.sql.rowset.serial.SerialException;

import com.app.dto.SignUpRequest;
import com.app.dto.SignUpResponse;

public interface IUserService {
	SignUpResponse registerUser(SignUpRequest request) throws IOException, SerialException, SQLException;
}
