package com.social.backend.Service;

import com.social.backend.Model.Friend;

import java.util.List;

public interface FriendService {

    public List<Friend> getOrderedFriends(String username) throws Exception;
    public String addFriend(String friendUsername, String accountUsername);
    public String getFriendStatus(String username, String friend) throws Exception;
}
