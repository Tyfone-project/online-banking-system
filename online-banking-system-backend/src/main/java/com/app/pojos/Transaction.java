package com.app.pojos;

import java.time.LocalDateTime;

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
public class Transaction extends BaseEntity {

	@Column(name = "transaction_from")
	private String transactionFrom;
	
	@Column(name = "transaction_to")
	private String transactionTo;
	
	@Range(min = 0)
	private Long amount;
	
	@Past
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDateTime timestamp;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "transaction_status", length = 20)
	private TransactionStatus transactionStatus;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
}
