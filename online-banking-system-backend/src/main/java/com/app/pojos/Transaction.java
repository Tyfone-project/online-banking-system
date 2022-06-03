package com.app.pojos;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Past;

import org.hibernate.validator.constraints.Range;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transactions")
@NoArgsConstructor
@AllArgsConstructor
@Data
@AttributeOverride(column = @Column(name = "transaction_id"), name = "id")
public class Transaction extends BaseEntity {
	
	@Column(name = "transaction_to")
	private long transactionTo;
	
	@Range(min = 0)
	private BigDecimal amount;
	
	@Past
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate date;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "transaction_status", length = 20)
	private TransactionStatus transactionStatus;
	
	@ManyToOne
    @JoinColumn(name = "transaction_from")
    private Account account;
	
}
