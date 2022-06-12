package com.app.pojos;

import java.io.Serializable;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class AccountNoGeneration implements IdentifierGenerator{

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		long count = (long)session.createQuery("select COUNT(a) from Account a").getSingleResult() + 1;
		return Long.parseLong("12000000000"+count);
	}

}
