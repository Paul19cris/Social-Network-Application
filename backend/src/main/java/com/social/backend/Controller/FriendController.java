package com.social.backend.Controller;

import com.social.backend.Model.Friend;
import com.social.backend.Model.ReturnWrapper;
import com.social.backend.Service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friend")
@CrossOrigin
public class FriendController {
    @Autowired
    private FriendService friendService;

    @PostMapping("/addFriend")
    public ReturnWrapper<String> addFriend(@RequestParam(name = "account") String accountUsername, @RequestParam(name = "friend") String friendUsername){
        try {
            return new ReturnWrapper<String>(friendService.addFriend(accountUsername, friendUsername));
        }
        catch (Exception ex) {
            return new ReturnWrapper<String>(ex.getLocalizedMessage());
        }
    }
    @GetMapping("/getFriendStatus")
    public ReturnWrapper<String> getFriendStatus(@RequestParam("friend") String friend, @RequestParam("username") String username) {
        try {
            return new ReturnWrapper<String>(friendService.getFriendStatus(username, friend));
        }
        catch (Exception ex) {
            return new ReturnWrapper<String>(ex);
        }
    }
    @GetMapping("/getOrderedFriends")
    public ReturnWrapper<List<Friend>> getOrderedFriends(@RequestParam("username") String username) {
        try {
            return new ReturnWrapper<List<Friend>>(friendService.getOrderedFriends(username));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<Friend>>(ex);
        }
    }
}
