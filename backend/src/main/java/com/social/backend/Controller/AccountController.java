package com.social.backend.Controller;

import com.social.backend.Model.Account;
import com.social.backend.Model.Friend;
import com.social.backend.Model.News;
import com.social.backend.Model.ReturnWrapper;
import com.social.backend.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Array;
import java.sql.Wrapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

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

    @GetMapping("/getAccountByEmail")
    public ReturnWrapper<Account> getAccountByEmail(@RequestParam(name = "email") String email) {
        try {
            return new ReturnWrapper<Account>(accountService.getAccountByEmail(email));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }

    @GetMapping("/getAccountByUsername")
    public ReturnWrapper<Account> getAccountByUsername(@RequestParam(name = "username") String username) {
        try {
            return new ReturnWrapper<Account>(accountService.getAccountByUsername(username));
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


    @PostMapping("/changeUsername")
    public ReturnWrapper<Boolean> changeUsername(@RequestParam("username") String username, @RequestParam("newUsername") String newUsername, @RequestParam("email") String email, @RequestParam("password") String password) {
        try {
            return new ReturnWrapper<Boolean>(accountService.changeUsername(username, newUsername, email, password));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Boolean>(ex);
        }
    }
    @PostMapping("/changeEmail")
    public ReturnWrapper<Boolean> changeEmail(@RequestParam("username") String username, @RequestParam("newEmail") String newEmail, @RequestParam("email") String email, @RequestParam("password") String password) {
        try {
            return new ReturnWrapper<Boolean>(accountService.changeEmail(username, newEmail, email, password));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Boolean>(ex);
        }
    }
    @PostMapping("/changePassword")
    public ReturnWrapper<Boolean> changePassword(@RequestParam("username") String username, @RequestParam("newPassword") String newPassword, @RequestParam("email") String email, @RequestParam("password") String password) {
        try {
            return new ReturnWrapper<Boolean>(accountService.changePassword(username, newPassword, email, password));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Boolean>(ex);
        }
    }
    @PostMapping("/deleteAccount")
    public ReturnWrapper<Boolean> deleteAccount(@RequestParam("username") String username, @RequestParam("confirm") String confirm, @RequestParam("email") String email, @RequestParam("password") String password) {
        try {
            return new ReturnWrapper<Boolean>(accountService.deleteAccount(username, confirm, email, password));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Boolean>(ex);
        }
    }
}