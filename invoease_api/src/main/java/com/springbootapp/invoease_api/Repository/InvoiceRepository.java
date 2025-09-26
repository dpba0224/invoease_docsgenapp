package com.springbootapp.invoease_api.Repository;

import com.springbootapp.invoease_api.Entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvoiceRepository extends MongoRepository<Invoice,String> {
}
