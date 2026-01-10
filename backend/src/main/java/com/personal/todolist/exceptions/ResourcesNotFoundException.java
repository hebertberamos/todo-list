package com.personal.todolist.exceptions;

public class ResourcesNotFoundException extends RuntimeException {
    public ResourcesNotFoundException(String msg){
        super(msg);
    }
}
