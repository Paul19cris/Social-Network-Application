package com.social.backend.Service;

import com.social.backend.Model.Account;
import com.social.backend.Model.News;

import java.util.List;

public interface NewsService {

    public Account postNews(String username, String news) throws Exception;
    public List<News> getNews(String username) throws Exception;
    public List<News> getUserNews(String username) throws Exception;
}
