package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.Friend;
import com.social.backend.Model.News;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface AccountService {
    public Account register(Account account) throws Exception;
    public Account login(Account account) throws Exception;
    public ArrayList<Account> getAccountsByKey(String key) throws Exception;
    public ArrayList<Account> getAccounts() throws Exception;
    public Account sendMessage(String username, String friend, String message) throws Exception;
    public Account setMessageToSeen(String username, String friend, int id) throws Exception;
    public Account getAccountByEmail(String email) throws Exception;
    public Account getAccountByUsername(String username) throws Exception;
    public String addFriend(String friendUsername, String accountUsername);
    public String getFriendStatus(String username, String friend) throws Exception;
    public Account postNews(String username, String news) throws Exception;
    public List<News> getNews(String username) throws Exception;
    public List<News> getUserNews(String username) throws Exception;
    public List<Integer> getUnseenNotifications(String username) throws Exception;
    public Integer getUnseenMessages(String username, String friend) throws Exception;
    public Boolean setToSeenNotification(String username, int notId) throws Exception;
    public Boolean setToSeenMessage(String username, String friend, int msgId) throws Exception;
    public Boolean changeUsername(String username, String newUsername, String email, String password) throws Exception;
    public Boolean changeEmail(String username, String newEmail, String email, String password) throws Exception;
    public Boolean changePassword(String username, String newPassword, String email, String password) throws Exception;
    public Boolean deleteAccount(String username, String confirm, String email, String password) throws Exception;
    public List<Friend> getOrderedFriends(String username) throws Exception;
}
