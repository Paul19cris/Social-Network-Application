package com.social.backend.Controller;

import com.social.backend.Model.Account;
import com.social.backend.Model.ReturnWrapper;
import com.social.backend.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Array;
import java.sql.Wrapper;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/addFriend")
    public ReturnWrapper<String> addFriend(@RequestParam(name = "account") String accountUsername, @RequestParam(name = "friend") String friendUsername){
        try {
            return new ReturnWrapper<String>(accountService.addFriend(accountUsername, friendUsername));
        }
        catch (Exception ex) {
            return new ReturnWrapper<String>(ex.getLocalizedMessage());
        }
    }

    @PostMapping("/register")
    public ReturnWrapper<Account> register(@RequestBody Account account){
        try {
            return new ReturnWrapper<Account>(accountService.register(account));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }

    @PostMapping("/login")
    public ReturnWrapper<Account> login(@RequestBody Account account){
        try {
            return new ReturnWrapper<Account>(accountService.login(account));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }

    @GetMapping("/getAccount")
    public ReturnWrapper<Account> getAccount(@RequestParam(name = "email") String email) {
        try {
            return new ReturnWrapper<Account>(accountService.getAccount(email));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }

    @GetMapping("/getUsers")
    public ReturnWrapper<ArrayList<Account>> getAll(){
        try {
            return new ReturnWrapper<ArrayList<Account>>(accountService.getAccounts());
        }
        catch (Exception ex) {
            return new ReturnWrapper<ArrayList<Account>>(ex);
        }
    }

    @GetMapping("/getUsersByKey")
    public ReturnWrapper<ArrayList<Account>> getAllByKey(@RequestParam(name = "key") String key){
        try {
            return new ReturnWrapper<ArrayList<Account>>(accountService.getAccountsByKey(key));
        }
        catch (Exception ex) {
            return new ReturnWrapper<ArrayList<Account>>(ex);
        }
    }
}