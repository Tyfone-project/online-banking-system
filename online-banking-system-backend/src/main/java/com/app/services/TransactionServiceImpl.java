package com.app.services;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.TransactionRepositry;
import com.app.dto.ChartDataDTO;
import com.app.dto.ChartRequestDto;
import com.app.dto.IMoneySpentInMonthDto;
import com.app.dto.ITransactionDto;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Service
@Transactional
public class TransactionServiceImpl implements ITransactionService {

	@Autowired
	private TransactionRepositry transactionRepo;
	
	@Override
	public List<ITransactionDto> getTransactionListByAccountNumber(long accountNo) {
		return transactionRepo.findByAccountNo(accountNo);
	}

	@Override
	public ChartDataDTO getMoneySpentByMonth(ChartRequestDto chartRequest) {
		List<IMoneySpentInMonthDto> moneySpentByMonth = transactionRepo.getMoneySpentByMonth(chartRequest.getAccountNumber(),chartRequest.getFrom(), chartRequest.getTo());
		ChartDataDTO chartData = new ChartDataDTO();
		moneySpentByMonth.forEach((dto)->{
			chartData.getLabels().add(dto.getMonth());
			chartData.getData().add(dto.getAmount());
		});
		return chartData;
	}
	
	@Override
	public OutputStream generateTransactionReport(long accountNo) throws FileNotFoundException {
		List<ITransactionDto> transactionList = transactionRepo.findByAccountNo(accountNo);		
		String path = "TransactionReport.pdf";
		OutputStream baos= new FileOutputStream(new File(path));
		try {
			
			Document document = new Document();
			PdfWriter.getInstance(document, baos);
			document.open();
			
			Font font2 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
	        font2.setSize(18);
	        font2.setColor(BaseColor.BLUE);
	        
	        ///PDF HEADING
			Paragraph p = new Paragraph("TRANSACTION REPORT",font2);
	        p.setAlignment(Paragraph.ALIGN_CENTER);
	        
	        //TABLE PROPERTIES
	        PdfPTable table = new PdfPTable(6);
	        table.setWidthPercentage(100f);
	        table.setWidths(new float[] {8.0f, 8.0f, 8.0f, 10.0f, 10.0f ,8.0f});
	        table.setSpacingBefore(10);
	        table.setPaddingTop(3);
	        table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
	        table.getDefaultCell().setVerticalAlignment(Element.ALIGN_MIDDLE);
	        
	        //TABLE HEADING
	        PdfPCell cell = new PdfPCell();
	        cell.setBackgroundColor(BaseColor.DARK_GRAY);
	        cell.setPadding(6);
	        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
	        Font font = FontFactory.getFont(FontFactory.HELVETICA);
	        font.setColor(BaseColor.WHITE);
	         
	        cell.setPhrase(new Phrase("Transaction ID", font));
	        table.addCell(cell);
	        cell.setPhrase(new Phrase("Amount", font));
	        table.addCell(cell);
	        cell.setPhrase(new Phrase("Transaction Date", font));
	        table.addCell(cell);
	        cell.setPhrase(new Phrase("Receiver Account Number", font));
	        table.addCell(cell);
	        cell.setPhrase(new Phrase("Sender Account Number", font));
	        table.addCell(cell);
	        cell.setPhrase(new Phrase("Transaction Status", font));
	        table.addCell(cell); 
	        
	        			
			for (ITransactionDto t : transactionList) {
				table.addCell(t.getTransactionId()+"");
				table.addCell(t.getAmount().toString());
				table.addCell(t.getDate().toString());
				table.addCell(t.getTransactionFrom() + "");
				table.addCell(t.getTransactionTo() + "");
				table.addCell(t.getTransactionStatus().toString());
			}
			document.add(p);
			document.add(Chunk.NEWLINE);
			document.add(table);
			document.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return baos;
	}

}
