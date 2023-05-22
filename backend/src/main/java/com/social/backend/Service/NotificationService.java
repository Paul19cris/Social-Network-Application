package com.social.backend.Service;

import java.util.List;

public interface NotificationService {
    public List<Integer> getUnseenNotifications(String username) throws Exception;
    public Boolean setToSeenNotification(String username, int notId) throws Exception;
}
