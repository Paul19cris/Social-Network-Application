package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.News;
import com.social.backend.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private AccountRepository accountRepository;
    @Override
    public Account postNews(String username, String news) throws Exception {
        if (news.equals("TESTARE")) throw new Exception("Unaccepted message.");
        Account account = accountRepository.getAccountByUsername(username).get();
        News postNews = new News();
        postNews.setUsername(username);
        postNews.setMessage(news);
        postNews.setLocalDateTime();
        account.addNews(postNews);
        try {
            accountRepository.save(account);
        }
        catch (Exception ex) {
            throw new Exception(ex);
        }
        return account;
    }
    @Override
    public List<News> getNews(String username) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        List<String> friends = account.getFriends().stream().filter(name -> name.getFriendType().equals("Friends.")).map(name -> name.getFriendName()).collect(Collectors.toList());
        friends.add(username);
        List<News> news = new ArrayList<>();
        for (String name : friends ) {
            Account acc = accountRepository.getAccountByUsername(name).get();
            for (News news1 : acc.getNews()) {
                news.add(news1);
            }
        }
        Collections.sort(news, new Comparator<News>() {
            @Override
            public int compare(News o1, News o2) {
                Integer id1 = (Integer) o1.getId();
                Integer id2 = (Integer) o2.getId();
                return id2.compareTo(id1);
            }
        });
        return news;
    }
    @Override
    public List<News> getUserNews(String username) throws Exception {
        Account account = accountRepository.getAccountByUsername(username).get();
        return account.getNews();
    }
}
