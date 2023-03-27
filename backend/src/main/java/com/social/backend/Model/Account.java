package com.social.backend.Model;

import jakarta.persistence.*;
import org.aspectj.weaver.ast.Not;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String email;
    private String password;
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable
    private List<Notification> notifications = new ArrayList<>();
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable
    private List<News> news = new ArrayList<>();
    @ManyToMany( cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable
    private List<Friend> friends = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void addNotifications(Notification notification) {
        this.notifications.add(notification);
    }

    public void removeNotifications(Notification notification){
        this.notifications.remove(notification);
    }

    public List<News> getNews() {
        return news;
    }

    public void addNews(News news) {
        this.news.add(news);
    }

    public void removeNews(News news){
        this.news.remove(news);
    }

    public List<Friend> getFriends() {
        return friends;
    }

    public void addFriends(Friend friend) {
        this.friends.add(friend);
    }

    public void removeFriends(Friend friend) {
        this.friends.remove(friend);
    }
}
