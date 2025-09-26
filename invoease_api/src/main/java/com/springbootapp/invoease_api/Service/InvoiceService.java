package com.springbootapp.invoease_api.Service;

import com.springbootapp.invoease_api.Entity.Invoice;
import com.springbootapp.invoease_api.Repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public Invoice save(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }
}
