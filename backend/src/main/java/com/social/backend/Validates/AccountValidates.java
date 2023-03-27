package com.social.backend.Validates;

import com.social.backend.Model.Account;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class AccountValidates {
    public void checkAccount(Account account) throws Exception{
        Pattern emailPattern = Pattern.compile("\\b[A-Z0-9._%-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}\\b", Pattern.CASE_INSENSITIVE);
        Pattern pattern = Pattern.compile("(?=[A-Za-z0-9@#$%^&+!=]+$)(?=.{4,}).*$", Pattern.CASE_INSENSITIVE);
        Matcher emailMatcher = emailPattern.matcher(account.getEmail());
        Matcher userMatcher = pattern.matcher(account.getUsername());
        Matcher passMatcher = pattern.matcher(account.getPassword());
        boolean matchFound = emailMatcher.find();
        boolean userFound = userMatcher.find();
        boolean passFound = passMatcher.find();
        if(!matchFound){
             throw new Exception("Invalid Email.");
        }
        if(!userFound){
            throw new Exception("Invalid Username.");
        }
        if(!passFound){
            throw new Exception("Invalid Password.");
        }
    }
}
