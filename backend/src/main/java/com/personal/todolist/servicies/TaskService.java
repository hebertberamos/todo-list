package com.personal.todolist.servicies;

import com.personal.todolist.entitites.Task;
import com.personal.todolist.entitites.User;
import com.personal.todolist.entitites.dtos.TaskDTO;
import com.personal.todolist.entitites.enums.UserRole;
import com.personal.todolist.exceptions.ResourcesNotFoundException;
import com.personal.todolist.exceptions.UnauthorizedException;
import com.personal.todolist.repositories.TaskRepository;
import com.personal.todolist.security.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository repository;
    private final SecurityService securityService;

    // Get all tasks
    public List<TaskDTO> getAll() {
        User user = securityService.getAuthenticatedUser();

        List<Task> tasks = user.getRole() == UserRole.USER ? repository.findByUser(user) : repository.findAll();
        List<TaskDTO> dtos =  new ArrayList<>();

        for(Task task : tasks) {
            TaskDTO dto = new TaskDTO(task);
            dtos.add(dto);
        }

        return dtos;
    }

    // Add task
    public TaskDTO addNewTask(TaskDTO requestBody) {
        User user = securityService.getAuthenticatedUser();
        Task retEntity = new Task(requestBody.getTitle(), requestBody.getDescription(), user);
        repository.save(retEntity);

        return new TaskDTO(retEntity);
    }

    // Update task
    public TaskDTO update(Long id, TaskDTO dto) {
        User authUser = securityService.getAuthenticatedUser();

        Task editTask = repository.findById(id).orElseThrow(() -> new ResourcesNotFoundException("Error to get task by this id"));

        //Check if the task being edited belongs to the user who is editing it.
        if(editTask.getUser() != authUser) {
            throw new UnauthorizedException("This user haven't right authentication to complete this request.");
        }

        editTask.setTitle(dto.getTitle());
        editTask.setDescription(dto.getDescription());
        editTask.setStatus(dto.getStatus());

        repository.save(editTask);

        return new TaskDTO(editTask);
    }

    // Delete task
    public void delete(Long id) {
        User authUser = securityService.getAuthenticatedUser();
        Task deleteTask = repository.findById(id).orElseThrow(() -> new ResourcesNotFoundException("Error to find task"));

        //Check if the task being edited belongs to the user who is editing it. Or if the user that is doing it have the role ADMIN
        if(deleteTask.getUser() != authUser || authUser.getRole() != UserRole.ADMIN) {
            throw new UnauthorizedException("");
        }

        repository.deleteById(id);
    }

}
