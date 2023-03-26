package com.social.backend.Validates;

import com.social.backend.Model.Account;
import com.social.backend.Model.Friend;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FriendValidates {
    private int check;
    public int FriendValidates(Account account, Account friend){
        check = 0;
        List<Friend> lst = account.getFriends().stream().filter(f -> friend.getUsername().equals(f.getFriendName())).collect(Collectors.toList());
        if ( !lst.isEmpty() ) {
            check += 1;
            if( lst.get(0).getFriendType().equals("Request Received.") ){
                check += 1;
            }
            if( lst.get(0).getFriendType().equals("Friends.") ){
                check += 2;
            }
        }
        return check;
    }
}
