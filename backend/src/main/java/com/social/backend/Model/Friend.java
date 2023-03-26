package com.social.backend.Model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String friendName;
    private String friendType;
    @ManyToMany( cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable
    private List<Message> messageList;

    public List<Message> getMessageList() {
        return messageList;
    }

    public void addMessageList(Message message) {
        this.messageList.add(message);
    }

    public void removeMessageList(Message message) {
        this.messageList.remove(message);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFriendName() {
        return friendName;
    }

    public void setFriendName(String friendName) {
        this.friendName = friendName;
    }

    public String getFriendType() {
        return friendType;
    }

    public void setFriendType(String friendType) {
        this.friendType = friendType;
    }
}
