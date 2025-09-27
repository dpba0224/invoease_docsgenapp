package com.springbootapp.invoease_api.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class EmailService {

    //Dependency Injections
    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String referenceEmail;

    public void sendInvoiceEmail(String toEmail, MultipartFile file)
        throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(referenceEmail);
        helper.setTo(toEmail);
        helper.setSubject("Your Invoice");
        helper.setText("Hi Customer! \n\nPlease see the attached invoice in this e-mail for your reference.\n\nThank you so much and stay safe!");
        String fileName = "invoice_" + System.currentTimeMillis() + ".pdf";
        helper.addAttachment(fileName, new ByteArrayResource(file.getBytes()));
        mailSender.send(message);
    }
}
