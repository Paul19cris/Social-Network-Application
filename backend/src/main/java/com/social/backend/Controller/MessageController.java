package com.social.backend.Controller;

import com.social.backend.Model.Account;
import com.social.backend.Model.ReturnWrapper;
import com.social.backend.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/message")
@CrossOrigin
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/setMessageToSeen")
    public ReturnWrapper<Account> setMessageToSeen(@RequestParam("username") String key, @RequestParam("friend") String friend, @RequestParam("id") int id) {
        try {
            return new ReturnWrapper<Account>(messageService.setMessageToSeen(key, friend, id));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }
    @PostMapping("/sendMessage")
    public ReturnWrapper<Account> getNews(@RequestParam("username") String key, @RequestParam("friend") String friend, @RequestParam("message") String message) {
        try {
            return new ReturnWrapper<Account>(messageService.sendMessage(key, friend, message));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }
    @GetMapping("/getUnseenMessages")
    public ReturnWrapper<Integer> getUnseenMessages(@RequestParam("username") String username, @RequestParam("friend") String friend) {
        try {
            return new ReturnWrapper<Integer>(messageService.getUnseenMessages(username, friend));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Integer>(ex);
        }
    }
    @PostMapping("/setToSeenMessage")
    public ReturnWrapper<Boolean> setToSeenMessage(@RequestParam("username") String username, @RequestParam("friend") String friend, @RequestParam("messageId") int id) {
        try {
            return new ReturnWrapper<Boolean>(messageService.setToSeenMessage(username, friend, id));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Boolean>(ex);
        }
    }
}
