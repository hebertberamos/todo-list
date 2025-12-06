package com.personal.todolist.entitites.dtos;

import com.personal.todolist.entitites.Task;
import com.personal.todolist.entitites.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserDTO {

    private String name;
    private String email;
    private String password;
    private UserRole role;
    private List<Task> tasks = new ArrayList<>();

    public UserDTO(String name, String email, String password, UserRole role, List<Task> tasks) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;

        if(!tasks.isEmpty()) {
            this.tasks.addAll(tasks);
        }

    }
}
