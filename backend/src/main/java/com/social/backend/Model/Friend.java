package com.social.backend.Model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String friendName;
    private String friendType;

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
