package com.app.services;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AccountRepositry;
import com.app.dao.TransactionRepositry;
import com.app.dao.UserRepository;
import com.app.dto.AccountDashboardDto;
import com.app.dto.AccountDto;
import com.app.dto.SignInResponse;
import com.app.dto.UserAccountDto;
import com.app.dto.UserDto;
import com.app.jwt_utils.JwtUtils;
import com.app.pojos.Account;
import com.app.pojos.AccountType;
import com.app.pojos.Transaction;
import com.app.pojos.TransactionStatus;
import com.app.pojos.User;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class AccountServiceImpl implements IAccountService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AccountRepositry accountRepo;

	@Autowired
	private TransactionRepositry transactionRepo;

	@Autowired
	private JwtUtils jwtUtils;

	@Override
	public Account transferFunds(long senderAccountNumber, long receiverAccountNumber, BigDecimal amountToTransfer,
			LocalDate amountTransferDate) {

		Account receiverAccountObject = accountRepo.findByAccountNo(receiverAccountNumber)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Account Number!!!"));

		Account senderAccountObject = accountRepo.findByAccountNo(senderAccountNumber)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Account Number!!!"));

		if (senderAccountObject.getBalance().compareTo(BigDecimal.ZERO) > 0
				&& (senderAccountObject.getAccountNo() != receiverAccountObject.getAccountNo())) {

			senderAccountObject.setBalance(senderAccountObject.getBalance().subtract(amountToTransfer));

			receiverAccountObject.setBalance(receiverAccountObject.getBalance().add(amountToTransfer));

			Transaction successfulTransaction = new Transaction(receiverAccountNumber, amountToTransfer, amountTransferDate,
					TransactionStatus.SUCCESS, senderAccountObject);
			transactionRepo.save(successfulTransaction);

			sendTransferMoneyMessage(senderAccountNumber, receiverAccountNumber, amountToTransfer);
			log.info(successfulTransaction.toString());
			return receiverAccountObject;
		}
		else if(senderAccountObject.getAccountNo() == receiverAccountObject.getAccountNo()) {
			
			log.error("Cannot Transfer Money To Same Account!!!");
			throw new RuntimeException("Cannot Transfer Money To Same Account!!!");
		}
		else {
			log.error("Insufficient Funds!!!");
			throw new RuntimeException("Insufficient Funds!!!");
		}
	}

	@Override
	public String saveAccount(AccountDto request, Principal principal) {
		long custId = Long.parseLong(principal.getName());
		User user = userRepo.findById(custId)
				.orElseThrow(() -> new ResourceNotFoundException("No customer exists with customer id: " + custId));

		Account account = new Account(request.getPin(), BigDecimal.ZERO,
				AccountType.valueOf(request.getAccountType().toUpperCase()), user);
		account.setPin(BCrypt.hashpw(account.getPin(), BCrypt.gensalt()));
		Account acc = accountRepo.save(account);
		return "Account with Id: " + acc.getAccountNo() + " created successfully";
	}

	@Override
	public UserDto retrieveAllAccountsByCustomerId(Principal principal) {
		long custId = Long.parseLong(principal.getName());
		User user = userRepo.findById(custId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		List<Account> accounts = accountRepo.findByCustomerId(custId);

		return new UserDto(
				accounts.stream().map((acc) -> new UserAccountDto(acc.getAccountNo(), acc.getAccountType().toString()))
						.collect(Collectors.toList()),
				user.getFirstName() + " " + user.getLastName(), user.getProfilePicture());
	}

	@Override
	public SignInResponse loginToAccount(long accountNumber, String pin, Authentication auth) {

		System.out.println(accountNumber + " | " + pin);
		Account loginAccountObject = accountRepo.findByAccountNo(accountNumber)
				.orElseThrow(() -> new RuntimeException("Invalid Account Number!!!"));
		System.out.println(loginAccountObject);
		boolean isPresent = BCrypt.checkpw(pin, loginAccountObject.getPin());
		if (isPresent) {
			return new SignInResponse(jwtUtils.generateJwtTokenWithAccNo(accountNumber, auth));
		}
		throw new RuntimeException("Invalid Pin!!!");
	}

	@Override
	public AccountDashboardDto getAccountDashboard(long accountNumber) {
		Account account = accountRepo.findByAccountNo(accountNumber)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Account Number!!!"));
		return new AccountDashboardDto(account.getBalance(), transactionRepo.findRecentTransactions(accountNumber),
				transactionRepo.getMoneySpentThisMonth(accountNumber));
	}
	
	@Override
	public void depositMoney(long accountNo, BigDecimal balance) {
		accountRepo.depositMoney(accountNo, balance);
		LocalDateTime localDateTime = LocalDateTime.now();
		String depositMoneyMessage = "Rs. "+balance+" Deposited to your account number ending with "+accountNo+" on "+localDateTime;
		long number = accountRepo.getPhoneNumber(accountNo);
		String phoneNumber="+91".concat(Long.toString(number));
		
		Twilio.init("AC9a25afa985740c879463f3b6ce51ea46", "366544fa5e2be9661d98db5fb9ce46fe");
		Message message = Message.creator(new PhoneNumber(phoneNumber), new PhoneNumber("14142961951"), depositMoneyMessage).create();
		log.info(depositMoneyMessage);
	}

	@Override
	public long getPhoneNumber(long accountNo) {
		return accountRepo.getPhoneNumber(accountNo);
	}
	
	private void sendTransferMoneyMessage(long senderAccountNumber, long receiverAccountNumber, BigDecimal amountToTransfer) {
		LocalDateTime localDateTime = LocalDateTime.now();
		String debitedMoneyMessage = "Rs. "+amountToTransfer+" Debited from your account number "+senderAccountNumber+" on "+localDateTime;
		String creditedMoneyMessage = "Rs. "+amountToTransfer+" Credited to your account number "+receiverAccountNumber+" on "+localDateTime;
		long getSenderPhoneNumber = getPhoneNumber(senderAccountNumber);
		long getReceiverPhoneNumber = getPhoneNumber(receiverAccountNumber);
		String senderPhoneNumber = "+91".concat(Long.toString(getSenderPhoneNumber));
		String receiverPhoneNumber = "+91".concat(Long.toString(getReceiverPhoneNumber));
		System.out.println(senderPhoneNumber + " " + receiverPhoneNumber);
		
		Twilio.init("AC9a25afa985740c879463f3b6ce51ea46", "366544fa5e2be9661d98db5fb9ce46fe");
		Message senderMessage = Message.creator(new com.twilio.type.PhoneNumber(senderPhoneNumber), new com.twilio.type.PhoneNumber("+14142961951"), debitedMoneyMessage).create();
		Message receiverMessage = Message.creator(new com.twilio.type.PhoneNumber(receiverPhoneNumber), new com.twilio.type.PhoneNumber("+14142961951"), creditedMoneyMessage).create();
		log.info(debitedMoneyMessage);
		log.info(creditedMoneyMessage);
		
	}
}
