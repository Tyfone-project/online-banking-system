package com.app.pojos;

import java.io.Serializable;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class CustomIdGen implements IdentifierGenerator{


	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		long count = (long)session.createQuery("select COUNT(u) from User u").getSingleResult() + 1;
		return Long.parseLong(count + ((User)object).getPhone());
	}
	
}
