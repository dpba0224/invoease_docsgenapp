package com.springbootapp.invoease_api.Repository;

import com.springbootapp.invoease_api.Entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByClerkId(String clerkId);
    boolean existsByClerkId(String clerkId);
}
