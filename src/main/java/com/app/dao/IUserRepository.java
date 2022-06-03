package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.User;

public interface IUserRepository extends JpaRepository<User, Long> {

}
