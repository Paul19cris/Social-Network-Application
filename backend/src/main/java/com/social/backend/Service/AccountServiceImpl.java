package com.social.backend.Service;

import com.social.backend.Model.*;
import com.social.backend.Repository.AccountRepository;
import com.social.backend.Validates.AccountValidates;
import com.social.backend.Validates.FriendValidates;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.*;
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
    public Account getAccountByEmail(String email) throws Exception{
        Optional<Account> account = accountRepository.getAccountByEmail(email);
        if ( account.isEmpty() ){
            throw new Exception("Account does not exist.");
        }
        return account.get();
    }

    @Override
    public Account getAccountByUsername(String username) throws Exception{
        Optional<Account> account = accountRepository.getAccountByUsername(username);
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
    @Override
    public Boolean changeUsername(String username, String newUsername, String email, String password) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        Optional<Account> checkIfExist = accountRepository.getAccountByUsername(newUsername);
        if(checkIfExist.isPresent()){
            throw new Exception("Username already exists.");
        }
        if (!account.getEmail().equals(email)) {
            throw new Exception("Wrong email");
        }
        if (!account.getPassword().equals(password)) {
            throw new Exception("Wrong password");
        }
        for (Friend fr : account.getFriends()) {
            for (Message msg : fr.getMessageList()) {
                if (msg.getUsername().equals(username)) {
                    msg.setUsername(newUsername);
                }
            }
            for (Friend friend : accountRepository.getAccountByUsername(fr.getFriendName()).get().getFriends()) {
                if (friend.getFriendName().equals(username)) {
                    friend.setFriendName(newUsername);
                    for (Message msg : friend.getMessageList()) {
                        if (msg.getUsername().equals(username)) {
                            msg.setUsername(newUsername);
                        }
                    }
                }
            }
            for (Notification notification : accountRepository.getAccountByUsername(fr.getFriendName()).get().getNotifications()) {
                if (notification.getFriendName().equals(username)) {
                    notification.setFriendName(newUsername);
                }
            }
        }
        account.setUsername(newUsername);
        try{
            accountValidates.checkAccount(account);
        }
        catch (IllegalAccessException e) {
            throw new Exception(e.getMessage());
        }
        accountRepository.save(account);
        return true;
    }
    @Override
    public Boolean deleteAccount(String username, String confirm, String email, String password) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        int id = account.getId();
        if (!confirm.equals("YES")) {
            throw new Exception("Delete was not confirmed.");
        }
        if (!account.getEmail().equals(email)) {
            throw new Exception("Wrong email");
        }
        if (!account.getPassword().equals(password)) {
            throw new Exception("Wrong password");
        }
        for (Friend fr : account.getFriends()) {
            Account friendAccount = accountRepository.getAccountByUsername(fr.getFriendName()).get();
            List<Friend> friends = new ArrayList<>(friendAccount.getFriends());
            ListIterator<Friend> iterator = friends.listIterator();
            while (iterator.hasNext()) {
                Friend accAsFriend = iterator.next();
                if (accAsFriend.getFriendName().equals(username)) {
                    iterator.remove();
                    accountRepository.save(friendAccount);
                }
            }
        }
        System.out.println("TEST");
        try {
            accountRepository.deleteById(id);
        }
        catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
        return true;
    }
    @Override
    public Boolean changeEmail(String username, String newEmail, String email, String password) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        Optional<Account> checkEmail = accountRepository.getAccountByEmail(newEmail);
        if(checkEmail.isPresent()){
            throw new Exception("Email already exists.");
        }
        if (!account.getEmail().equals(email)) {
            throw new Exception("Wrong email");
        }
        if (!account.getPassword().equals(password)) {
            throw new Exception("Wrong password");
        }
        account.setEmail(newEmail);
        try{
            accountValidates.checkAccount(account);
        }
        catch (IllegalAccessException e) {
            throw new Exception(e.getMessage());
        }
        accountRepository.save(account);
        return true;
    }
    @Override
    public Boolean changePassword(String username, String newPassword, String email, String password) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        if (!account.getEmail().equals(email)) {
            throw new Exception("Wrong email");
        }
        if (!account.getPassword().equals(password)) {
            throw new Exception("Wrong password");
        }
        account.setPassword(newPassword);
        try{
            accountValidates.checkAccount(account);
        }
        catch (IllegalAccessException e) {
            throw new Exception(e.getMessage());
        }
        accountRepository.save(account);
        return true;
    }
}