package com.social.backend.Service;

import com.social.backend.Model.Account;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface AccountService {
    public Account register(Account account) throws Exception;
    public Account login(Account account) throws Exception;
    public ArrayList<Account> getAccountsByKey(String key) throws Exception;
    public ArrayList<Account> getAccounts() throws Exception;
    public Account getAccount(String email) throws Exception;
    public String addFriend(String friendUsername, String accountUsername);
}
