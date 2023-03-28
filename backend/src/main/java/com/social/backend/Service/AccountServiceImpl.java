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
    public String addFriend(String accountUsername, String friendUsername){
        Account account = accountRepository.getAccountByUsername(accountUsername).get();
        Account friendAccount = accountRepository.getAccountByUsername(friendUsername).get();
        int check = friendValidates.FriendValidates(account, friendAccount);
        String msg = "";
        switch (check) {
            case 0 -> {
                //Friend Notification
                Notification friendNot = new Notification();
                friendNot.setTime();
                friendNot.setType("Friend Request Received.");
                friendNot.setFriendName(accountUsername);
                friendNot.setSeen(false);
                friendNot.setMessage(friendNot.getFriendName() + " sent you a friend request.");
                //Account Notification
                Notification accountNot = new Notification();
                accountNot.setTime();
                accountNot.setSeen(false);
                accountNot.setType("Friend Request Sent.");
                accountNot.setFriendName(friendUsername);
                accountNot.setMessage(accountNot.getFriendName() + " received your friend request.");

                Friend friend = new Friend();
                friend.setFriendName(friendUsername);
                friend.setFriendType("Request Sent.");
                friend.setTime();
                Friend accountAsFriend = new Friend();
                accountAsFriend.setFriendName(accountUsername);
                accountAsFriend.setTime();
                accountAsFriend.setFriendType("Request Received.");
                account.addFriends(friend);
                friendAccount.addFriends(accountAsFriend);
                friendAccount.addNotifications(friendNot);
                account.addNotifications(accountNot);
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
                account.getFriends()
                        .stream()
                        .filter(f -> f.getFriendName().equals(friendUsername)).toList()
                        .get(0).setTime();
                friendAccount.getFriends()
                        .stream()
                        .filter(f -> f.getFriendName().equals(accountUsername)).toList()
                        .get(0).setTime();
                //Friend notification
                Notification friendNot = new Notification();
                friendNot.setTime();
                friendNot.setSeen(false);
                friendNot.setType("Friend Request Accepted.");
                friendNot.setFriendName(accountUsername);
                friendNot.setMessage(friendNot.getFriendName() + " accepted your friend request.");
                //My notification
                Notification accountNot = new Notification();
                accountNot.setTime();
                accountNot.setSeen(false);
                accountNot.setType("New friend.");
                accountNot.setFriendName(friendUsername);
                accountNot.setMessage(accountNot.getFriendName() + " is now your friend.");
                account.addNotifications(accountNot);
                friendAccount.addNotifications(friendNot);
                accountRepository.save(account);
                accountRepository.save(friendAccount);
                msg = "Friends.";
            }
            case 3 -> msg = "Already Friends.";
        }
        return msg;
    }
    @Override
    public String getFriendStatus(String username, String friend) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        String status = "Send Request.";
        for (Friend friend1 : account.getFriends()) {
            if (friend1.getFriendName().equals(friend)) {
                status = friend1.getFriendType();
            }
        }
        return status;
    }
    @Override
    public Account postNews(String username, String news) throws Exception {
        if (news.equals("TESTARE")) throw new Exception("Unaccepted message.");
        Account account = accountRepository.getAccountByUsername(username).get();
        News postNews = new News();
        postNews.setUsername(username);
        postNews.setMessage(news);
        postNews.setLocalDateTime();
        account.addNews(postNews);
        try {
            accountRepository.save(account);
        }
        catch (Exception ex) {
            throw new Exception(ex);
        }
        return account;
    }
    @Override
    public List<News> getNews(String username) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        List<String> friends = account.getFriends().stream().filter(name -> name.getFriendType().equals("Friends.")).map(name -> name.getFriendName()).collect(Collectors.toList());
        friends.add(username);
        List<News> news = new ArrayList<>();
        for (String name : friends ) {
            Account acc = accountRepository.getAccountByUsername(name).get();
            for (News news1 : acc.getNews()) {
                news.add(news1);
            }
        }
        Collections.sort(news, new Comparator<News>() {
            @Override
            public int compare(News o1, News o2) {
                Integer id1 = (Integer) o1.getId();
                Integer id2 = (Integer) o2.getId();
                return id2.compareTo(id1);
            }
        });
        return news;
    }
    @Override
    public List<News> getUserNews(String username) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        return account.getNews();
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
    public Account sendMessage(String username, String friend, String message) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        Account friendAccount = accountRepository.getAccountByUsername(friend).get();
        for (Friend fr : friendAccount.getFriends()) {
            if(fr.getFriendName().equals(username)) {
                Message msg = new Message();
                msg.setSeen(false);
                msg.setMessage(message);
                msg.setUsername(username);
                msg.setTime();
                fr.addMessage(msg);
                fr.setTime();
            }
        }
        for (Friend fr : account.getFriends() ) {
            if(fr.getFriendName().equals(friend)) {
                Message msg = new Message();
                msg.setSeen(true);
                msg.setMessage(message);
                msg.setUsername(username);
                msg.setTime();
                fr.addMessage(msg);
                fr.setTime();
            }
        }
        accountRepository.save(account);
        accountRepository.save(friendAccount);
        return account;
    }

    @Override
    public Account setMessageToSeen(String username, String friend, int id) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        for (Friend fr : account.getFriends()) {
            if(fr.getFriendName().equals(username)) {
                for(Message msg : fr.getMessageList()) {
                    if(msg.getId() == id) {
                        msg.setSeen(true);
                    }
                }
            }
        }
        accountRepository.save(account);
        return account;
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
    public List<Integer> getUnseenNotifications(String username) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        Integer notNr = 0;
        Integer msgNr = 0;
        for (Friend friend : account.getFriends()) {
            for (Message message : friend.getMessageList()) {
                if (message.getSeen().equals(false)) {
                    msgNr += 1;
                }
            }
        }
        for (Notification not : account.getNotifications()) {
            if (not.getSeen().equals(false)) {
                notNr += 1;
            }
        }
        List<Integer> nrList = new ArrayList<Integer>();
        nrList.add(msgNr);
        nrList.add(notNr);
        return nrList;
    }
    @Override
    public Integer getUnseenMessages(String username, String friend) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        int msgNr = 0;
        for (Friend fr : account.getFriends()) {
            if (fr.getFriendName().equals(friend)) {
                for (Message msg : fr.getMessageList()) {
                    if (msg.getSeen().equals(false)) {
                        msgNr += 1;
                    }
                }
            }
        }
        return msgNr;
    }
    @Override
    public Boolean setToSeenNotification(String username, int notId) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        for (Notification not : account.getNotifications()) {
            if (not.getId() == notId) {
                not.setSeen(true);
            }
        }
        accountRepository.save(account);
        return true;
    }
    @Override
    public Boolean setToSeenMessage(String username, String friend, int msgId) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        for (Friend fr : account.getFriends()) {
            if (fr.getFriendName().equals(friend)) {
                for (Message msg : fr.getMessageList()) {
                    if (msg.getId() == msgId) {
                        msg.setSeen(true);
                    }
                }
            }
        }
        accountRepository.save(account);
        return true;
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

    public List<Friend> getOrderedFriends(String username) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        List<Friend> lst = account.getFriends();
        Comparator<Friend> byTime = Comparator.comparing(Friend::getTime);
        lst.sort(byTime.reversed());
        return lst;
    }
}