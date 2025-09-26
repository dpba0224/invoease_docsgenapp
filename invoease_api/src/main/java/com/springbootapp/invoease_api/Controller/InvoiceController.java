package com.springbootapp.invoease_api.Controller;

import com.springbootapp.invoease_api.Entity.Invoice;
import com.springbootapp.invoease_api.Repository.InvoiceRepository;
import com.springbootapp.invoease_api.Service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
@CrossOrigin("*")
public class InvoiceController {

    // Dependency Injections
    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.save(invoice));
    }
}
