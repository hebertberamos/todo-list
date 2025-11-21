package com.personal.todolist.entitites.dtos;


import com.personal.todolist.entitites.Task;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDTO {

    private String title;
    private String description;

    public TaskDTO() {}

    public TaskDTO(Task task) {
        this.title = task.getTitle();
        this.description = task.getDescription();
    }
}
