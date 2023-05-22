package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.Friend;
import com.social.backend.Model.Message;
import com.social.backend.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private AccountRepository accountRepository;
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
}
