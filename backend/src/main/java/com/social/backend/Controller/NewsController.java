package com.social.backend.Controller;

import com.social.backend.Model.Account;
import com.social.backend.Model.News;
import com.social.backend.Model.ReturnWrapper;
import com.social.backend.Service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
@CrossOrigin
public class NewsController {
    @Autowired
    private NewsService newsService;
    @GetMapping("/getNews")
    public ReturnWrapper<List<News>> getNews(@RequestParam("username") String key) {
        try {
            return new ReturnWrapper<List<News>>(newsService.getNews(key));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<News>>(ex);
        }
    }

    @GetMapping("/getUserNews")
    public ReturnWrapper<List<News>> getUserNews(@RequestParam("username") String key) {
        try {
            return new ReturnWrapper<List<News>>(newsService.getUserNews(key));
        }
        catch (Exception ex) {
            return new ReturnWrapper<List<News>>(ex);
        }
    }

    @PostMapping("/postNews")
    public ReturnWrapper<Account> postNews(@RequestParam("news") String news, @RequestParam("username") String username) {
        try {
            return new ReturnWrapper<Account>(newsService.postNews(username, news));
        }
        catch (Exception ex) {
            return new ReturnWrapper<Account>(ex);
        }
    }
}
