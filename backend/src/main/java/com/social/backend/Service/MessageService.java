package com.social.backend.Service;

import com.social.backend.Model.Account;

public interface MessageService {
    public Boolean setToSeenMessage(String username, String friend, int msgId) throws Exception;
    public Integer getUnseenMessages(String username, String friend) throws Exception;
    public Account sendMessage(String username, String friend, String message) throws Exception;
    public Account setMessageToSeen(String username, String friend, int id) throws Exception;
}
