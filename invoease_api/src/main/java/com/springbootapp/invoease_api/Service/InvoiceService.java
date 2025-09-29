package com.springbootapp.invoease_api.Service;

import com.springbootapp.invoease_api.Entity.Invoice;
import com.springbootapp.invoease_api.Repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public Invoice save(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> fetchInvoices(String clerkId) {
        return invoiceRepository.findByClerkId(clerkId);
    }

    public void deleteInvoice(String invoiceId, String clerkId){
        Invoice existingInvoice = invoiceRepository.findByClerkIdAndId(clerkId, invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice is not found: " + invoiceId));

        invoiceRepository.delete(existingInvoice);
    }


}
