package com.app.services;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.TransactionRepositry;
import com.app.pojos.Transaction;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Service
@Transactional
public class TransactionServiceImpl implements ITransactionService {

	@Autowired
	private TransactionRepositry transactionRepo;

	@Override
	public List<Transaction> getTransactionListByAccountNumber(long accountNo) {
		return transactionRepo.findByAccountNo(accountNo);
	}

	@Override
	public byte[] generateTransactionReport(long accountNo) throws FileNotFoundException {
		List<Transaction> transactionList = transactionRepo.findByAccountNo(accountNo);
		String path="TransactionReport.pdf";
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			
			Document document = new Document();
			PdfWriter.getInstance(document, baos);
			document.open();
			Paragraph para = new Paragraph();
			para.add(new Paragraph("TRANSACTION REPORT"));
			PdfPTable table = new PdfPTable(6);
			table.addCell("transaction ID");
			table.addCell("Amount");
			table.addCell("Date");
			table.addCell("Status");
			table.addCell("Transaction To");
			//table.addCell("Transaction From");
			for(Transaction t: transactionList) {
				table.addCell(t.getId().toString());
				table.addCell(t.getAmount().toString());
				table.addCell(t.getDate().toString());
				table.addCell(t.getTransactionStatus().toString());
				table.addCell(t.getTransactionTo()+"");
			}
			// addContent(document);
			document.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return baos.toByteArray();
	}
}
