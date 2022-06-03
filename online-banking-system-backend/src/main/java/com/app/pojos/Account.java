package com.app.pojos;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "accounts")
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_no")
    private long accountNo;


    @Column(nullable = false)
    @Length(min = 4, max = 4)
    private String pin;

    @Column(nullable = false)
    @Range(min = 0, message = "Balance cannot be negative")
    private BigDecimal balance;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_type", nullable = false, length = 20)
    private AccountType accountType;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    // @Column(nullable = false)
    private User user;

    public Account(String pin, BigDecimal balance, AccountType accountType, User user) {
        super();
        this.pin = pin;
        this.balance = balance;
        this.accountType = accountType;
        this.user = user;
    }
    
}