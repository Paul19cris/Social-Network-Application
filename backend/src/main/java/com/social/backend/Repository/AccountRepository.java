package com.social.backend.Repository;

import com.social.backend.Model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account,Integer> {
    Optional<Account> getAccountByUsername(String username);
    Optional<Account> getAccountByEmail(String email);
}
