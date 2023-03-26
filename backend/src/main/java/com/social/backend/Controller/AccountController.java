package com.social.backend.Controller;

import com.social.backend.Model.Account;
import com.social.backend.Model.News;
import com.social.backend.Model.ReturnWrapper;
import com.social.backend.Service.AccountService;
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

    @PostMapping("/addFriend")
    public ReturnWrapper<String> addFriend(@RequestParam(name = "account") String accountUsername, @RequestParam(name = "friend") String friendUsername){
        try {
            return new ReturnWrapper<String>(accountService.addFriend(accountUsername, friendUsername));
        }
        catch (Exception ex) {
            return new ReturnWrapper<String>(ex.getLocalizedMessage());
        }
    }
    @GetMapping("/getFriendStatus")
    public ReturnWrapper<String> getFriendStatus(@RequestParam("friend") String friend, @RequestParam("username") String username) {
        try {
            return new ReturnWrapper<String>(accountService.getFriendStatus(username, friend));
        }
        catch (Exception ex) {
            return new ReturnWrapper<String>(ex);
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
    @GetMapping("/getNews")
    public ReturnWrapper<List<News>> getNews(@RequestParam("username") String key) {
        try {
            return new ReturnWrapper<List<News>>(accountService.getNews(key));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<News>>(ex);
        }
    }

    @GetMapping("/getUserNews")
    public ReturnWrapper<List<News>> getUserNews(@RequestParam("username") String key) {
        try {
            return new ReturnWrapper<List<News>>(accountService.getUserNews(key));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<News>>(ex);
        }
    }

    @PostMapping("/postNews")
    public ReturnWrapper<Account> postNews(@RequestParam("news") String news, @RequestParam("username") String username) {
        try {
            return new ReturnWrapper<Account>(accountService.postNews(username, news));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }

    @GetMapping("/getUnseenNotifications")
    public ReturnWrapper<List<Integer>> getUnseenNotifications(@RequestParam("username") String username) {
        try {
            return new ReturnWrapper<List<Integer>>(accountService.getUnseenNotifications(username));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Integer>>(ex);
        }
    }

    @PostMapping("/setToSeenNotification")
    public ReturnWrapper<Boolean> setToSeenNotification(@RequestParam("username") String username, @RequestParam("notId") int notId) {
        try {
            return new ReturnWrapper<Boolean>(accountService.setToSeenNotification(username, notId));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Boolean>(ex);
        }
    }
}