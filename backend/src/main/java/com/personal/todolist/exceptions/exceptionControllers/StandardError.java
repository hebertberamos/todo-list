package com.personal.todolist.exceptions.exceptionControllers;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;

@Setter
@Getter
public class StandardError implements Serializable {

    private Instant timestamp;
    private Integer status;
    private String error;
    private String path;

    public StandardError(){
    }

}
