package com.app.services;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.saml2.Saml2RelyingPartyProperties.Decryption;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AccountRepositry;
import com.app.dao.TransactionRepositry;
import com.app.dao.UserRepository;
import com.app.dto.AccountDashboardDto;
import com.app.dto.AccountDto;
import com.app.dto.ConfirmAccountDto;
import com.app.dto.SignInResponse;
import com.app.dto.UserAccountDto;
import com.app.jwt_utils.JwtUtils;
import com.app.dto.UserDto;
import com.app.pojos.Account;
import com.app.pojos.AccountType;
import com.app.pojos.Transaction;
import com.app.pojos.TransactionStatus;
import com.app.pojos.User;

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

		System.out.println("in transfer funds method");
		Account receiverAccountObject = accountRepo.findByAccountNo(receiverAccountNumber)
				.orElseThrow(() -> new RuntimeException("Invalid Account Number!!!"));

		Account senderAccountObject = accountRepo.findByAccountNo(senderAccountNumber)
				.orElseThrow(() -> new RuntimeException("Invalid Account Number!!!"));

		if (senderAccountObject.getBalance().compareTo(BigDecimal.ZERO) > 0) {

			senderAccountObject.setBalance(senderAccountObject.getBalance().subtract(amountToTransfer));

			receiverAccountObject.setBalance(receiverAccountObject.getBalance().add(amountToTransfer));

			transactionRepo.save(new Transaction(receiverAccountNumber, amountToTransfer, amountTransferDate,
					TransactionStatus.SUCCESS, senderAccountObject));

			System.out.println("transfer funds sucessful");
			return receiverAccountObject;
		}
		throw new RuntimeException("Insufficient Funds!!!");
	}

	@Override
	public String saveAccount(AccountDto request, Principal principal) {
		System.out.println(request.getPin() + " " + request.getAccountType());
		long custId = Long.parseLong(principal.getName());
		User user = userRepo.findById(custId)
				.orElseThrow(() -> new RuntimeException("No customer exists with customer id: " + custId));

		Account account = new Account(request.getPin(), BigDecimal.ZERO,
				AccountType.valueOf(request.getAccountType().toUpperCase()), user);
		account.setPin(BCrypt.hashpw(account.getPin(), BCrypt.gensalt()));
		Account acc = accountRepo.save(account);
		return "Account with Id: " + acc.getAccountNo() + " created successfully";
	}

	@Override
	public UserDto retrieveAllAccountsByCustomerId(Principal principal) {
		long custId = Long.parseLong(principal.getName());
		Optional<User> user = userRepo.findById(custId);
		return new UserDto(accountRepo.findByCustomerId(custId), user);
	}

	@Override
	public SignInResponse loginToAccount(long accountNumber, String pin) {

		System.out.println(accountNumber+" | "+pin);
		Account loginAccountObject = accountRepo.findByAccountNo(accountNumber)
				.orElseThrow(() -> new RuntimeException("Invalid Account Number!!!"));
		System.out.println(loginAccountObject);
		boolean isPresent = BCrypt.checkpw(pin, loginAccountObject.getPin());
		if (isPresent) {
			return new SignInResponse(jwtUtils.generateJwtTokenWithAccNo(accountNumber));
		}
		throw new RuntimeException("Invalid Pin!!!");
	}

	@Override
	public AccountDashboardDto getAccountDashboard(long accountNumber) {
		Account account = accountRepo.findByAccountNo(accountNumber)
				.orElseThrow(() -> new RuntimeException("Invalid Account Number!!!"));
		return new AccountDashboardDto(account.getBalance(), transactionRepo.findRecentTransactions(accountNumber),
				transactionRepo.getMoneySpentThisMonth(accountNumber));
	}

	@Override
	public int getAccountByAccountNo(ConfirmAccountDto accountDetails) {
		long accountNo = Long.parseLong(accountDetails.getAccountNo());
		String pin= accountDetails.getPin();
		int result=accountRepo.findByAccountNoAndPin(accountNo,pin);
		return result;
	}

}
