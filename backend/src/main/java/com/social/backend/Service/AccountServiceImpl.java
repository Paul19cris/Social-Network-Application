package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.Friend;
import com.social.backend.Model.Notification;
import com.social.backend.Repository.AccountRepository;
import com.social.backend.Validates.AccountValidates;
import com.social.backend.Validates.FriendValidates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountValidates accountValidates;
    @Autowired
    private FriendValidates friendValidates;
    @Override
    public String addFriend(String accountUsername, String friendUsername){
        Account account = accountRepository.getAccountByUsername(accountUsername).get();
        Account friendAccount = accountRepository.getAccountByUsername(friendUsername).get();
        int check = friendValidates.FriendValidates(account, friendAccount);
        System.out.println(check);
        String msg = "";
        switch (check) {
            case 0 -> {
                Friend friend = new Friend();
                friend.setFriendName(friendUsername);
                friend.setFriendType("Request Sent.");
                Friend accountAsFriend = new Friend();
                accountAsFriend.setFriendName(accountUsername);
                accountAsFriend.setFriendType("Request Received.");
                account.addFriends(friend);
                friendAccount.addFriends(accountAsFriend);
                accountRepository.save(account);
                accountRepository.save(friendAccount);
                msg = "Request Sent.";
            }
            case 1 -> msg = "Request is already sent.";
            case 2 -> {
                account.getFriends()
                        .stream()
                        .filter(f -> f.getFriendName().equals(friendUsername)).toList()
                        .get(0).setFriendType("Friends.");
                friendAccount.getFriends()
                        .stream()
                        .filter(f -> f.getFriendName().equals(accountUsername)).toList()
                        .get(0).setFriendType("Friends.");
                accountRepository.save(account);
                accountRepository.save(friendAccount);
                msg = "Friends.";
            }
            case 3 -> msg = "Already Friends.";
        }
        return msg;
    }
    @Override
    public Account register(Account account) throws Exception {
        Optional<Account> accountOptional = accountRepository.getAccountByUsername(account.getUsername());
        if(accountOptional.isPresent()){
            throw new Exception("Username already exists.");
        }
        Optional<Account> emailOptional = accountRepository.getAccountByEmail(account.getEmail());
        if(emailOptional.isPresent()){
            throw new Exception("Email already exists.");
        }
        try{
            accountValidates.checkAccount(account);
        }
        catch (IllegalAccessException e) {
            throw new Exception(e.getMessage());
        }
        accountRepository.save(account);
        Optional<Account> accountCheck = accountRepository.getAccountByEmail(account.getEmail());
        return accountCheck.get();
    }

    @Override
    public Account login(Account account) throws Exception {
        Optional<Account> accountCheck = accountRepository.getAccountByEmail(account.getEmail());
        if(accountCheck.isEmpty()){
            throw new Exception("Email does not exist.");
        }
        if(!accountCheck.get().getPassword().equals(account.getPassword())){
            throw new Exception("Incorrect password.");
        }
        return accountCheck.get();
    }

    @Override
    public Account getAccount(String email) throws Exception{
        Optional<Account> account = accountRepository.getAccountByEmail(email);
        if ( account.isEmpty() ){
            throw new Exception("Account does not exist.");
        }
        return account.get();
    }

    @Override
    public ArrayList<Account> getAccounts() throws Exception {
        ArrayList<Account> accounts = (ArrayList<Account>) accountRepository.findAll();
        if ( accounts.isEmpty() ) {
            throw new Exception("Nothing was found.");
        }
        return accounts;
    }

    @Override
    public ArrayList<Account> getAccountsByKey(String key) throws Exception {
        ArrayList<Account> accounts = (ArrayList<Account>) accountRepository.findAll();
        ArrayList<Account> finalAccounts = new ArrayList<Account>();
        for(Account i : accounts){
            if (i.getUsername().toLowerCase().startsWith(key.toLowerCase())) {
                finalAccounts.add(i);
            }
        }
        if ( finalAccounts.isEmpty() ) {
            throw new Exception("Nothing was found.");
        }
        return finalAccounts;
    }
}