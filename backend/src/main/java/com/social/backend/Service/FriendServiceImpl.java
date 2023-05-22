package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.Friend;
import com.social.backend.Model.Notification;
import com.social.backend.Repository.AccountRepository;
import com.social.backend.Validates.AccountValidates;
import com.social.backend.Validates.FriendValidates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class FriendServiceImpl implements FriendService {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountValidates accountValidates;
    @Autowired
    private FriendValidates friendValidates;
    public List<Friend> getOrderedFriends(String username) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        List<Friend> lst = account.getFriends();
        Comparator<Friend> byTime = Comparator.comparing(Friend::getTime);
        lst.sort(byTime.reversed());
        return lst;
    }
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
}
