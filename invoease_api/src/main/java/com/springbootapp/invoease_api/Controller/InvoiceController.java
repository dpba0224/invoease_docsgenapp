package com.springbootapp.invoease_api.Controller;

import com.springbootapp.invoease_api.Entity.Invoice;
import com.springbootapp.invoease_api.Repository.InvoiceRepository;
import com.springbootapp.invoease_api.Service.EmailService;
import com.springbootapp.invoease_api.Service.InvoiceService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
@CrossOrigin("*")
public class InvoiceController {

    // Dependency Injections
    private final InvoiceService invoiceService;
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.save(invoice));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.fetchInvoices());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable String id) {
        invoiceService.deleteInvoice(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/sendinvoice")
    public ResponseEntity<?> sendInvoice(
        @RequestPart("file") MultipartFile file,
        @RequestPart("email") String customerEmail
    ){
        try{
            emailService.sendInvoiceEmail(customerEmail, file);
            return ResponseEntity.ok().body("The invoice was sent successfully!");
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send invoice.");
        }

    }
}
