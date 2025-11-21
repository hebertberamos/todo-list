package com.personal.todolist.servicies;

import com.personal.todolist.entitites.Task;
import com.personal.todolist.entitites.User;
import com.personal.todolist.entitites.dtos.TaskDTO;
import com.personal.todolist.repositories.TaskRepository;
import com.personal.todolist.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository repository;
    private final UserRepository userRepository;


    // Add task
    public TaskDTO addNewTask(TaskDTO requestBody) {
        Task retEntity = null;
        try {
            // Find user in database and instantiate it
            //      So far, all tasks will be added to the same user ever.
            User user = userRepository.findById(1L).orElseThrow(() -> new ExpressionException("User not found"));

            // Save the new task with the found users
            retEntity = new Task(requestBody.getTitle(), requestBody.getDescription(), user);
            repository.save(retEntity);

            return new TaskDTO(retEntity);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    // Update task

    // Delete task

}
