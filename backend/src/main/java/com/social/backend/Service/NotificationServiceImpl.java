package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.Friend;
import com.social.backend.Model.Message;
import com.social.backend.Model.Notification;
import com.social.backend.Repository.AccountRepository;
import com.social.backend.Validates.AccountValidates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountValidates accountValidates;
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
}
