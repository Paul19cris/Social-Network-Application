package com.social.backend.Model;

import org.springframework.http.ResponseEntity;

public class ReturnWrapper<T> {
    public String errorMessage;
    public boolean isSuccess;
    public T returnValue;

    public ReturnWrapper(T returnValue) {
        this.returnValue = returnValue;
        this.isSuccess = true;
        this.errorMessage = "";
    }

    public ReturnWrapper(Exception exception) {
        this.errorMessage = exception.getMessage();
        this.isSuccess = false;
        this.returnValue = null;
    }
}
