package com.social.backend.Controller;

import com.social.backend.Model.Account;
import com.social.backend.Model.Friend;
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

    @GetMapping("/getOrderedFriends")
    public ReturnWrapper<List<Friend>> getOrderedFriends(@RequestParam("username") String username) {
        try {
            return new ReturnWrapper<List<Friend>>(accountService.getOrderedFriends(username));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Friend>>(ex);
        }
    }
    @PostMapping("/setMessageToSeen")
    public ReturnWrapper<Account> setMessageToSeen(@RequestParam("username") String key, @RequestParam("friend") String friend, @RequestParam("id") int id) {
        try {
            return new ReturnWrapper<Account>(accountService.setMessageToSeen(key, friend, id));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }
    @PostMapping("/sendMessage")
    public ReturnWrapper<Account> getNews(@RequestParam("username") String key, @RequestParam("friend") String friend, @RequestParam("message") String message) {
        try {
            return new ReturnWrapper<Account>(accountService.sendMessage(key, friend, message));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
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
    @GetMapping("/getUnseenMessages")
    public ReturnWrapper<Integer> getUnseenMessages(@RequestParam("username") String username, @RequestParam("friend") String friend) {
        try {
            return new ReturnWrapper<Integer>(accountService.getUnseenMessages(username, friend));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Integer>(ex);
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
    @PostMapping("/setToSeenMessage")
    public ReturnWrapper<Boolean> setToSeenMessage(@RequestParam("username") String username, @RequestParam("friend") String friend, @RequestParam("messageId") int id) {
        try {
            return new ReturnWrapper<Boolean>(accountService.setToSeenMessage(username, friend, id));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Boolean>(ex);
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