package com.social.backend.Controller;

import com.social.backend.Model.ReturnWrapper;
import com.social.backend.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
@CrossOrigin
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @GetMapping("/getUnseenNotifications")
    public ReturnWrapper<List<Integer>> getUnseenNotifications(@RequestParam("username") String username) {
        try {
            return new ReturnWrapper<List<Integer>>(notificationService.getUnseenNotifications(username));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Integer>>(ex);
        }
    }
    @PostMapping("/setToSeenNotification")
    public ReturnWrapper<Boolean> setToSeenNotification(@RequestParam("username") String username, @RequestParam("notId") int notId) {
        try {
            return new ReturnWrapper<Boolean>(notificationService.setToSeenNotification(username, notId));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Boolean>(ex);
        }
    }
}
