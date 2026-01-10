package com.personal.todolist.controllers;

import com.personal.todolist.entitites.dtos.TaskDTO;
import com.personal.todolist.exceptions.ResourcesNotFoundException;
import com.personal.todolist.servicies.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;


@RestController
@RequestMapping("tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAll() {
        List<TaskDTO> retList = service.getAll();
        if(retList == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(retList);

    }

    @PostMapping
    public ResponseEntity<TaskDTO> save(@RequestBody TaskDTO requestBody) {
        TaskDTO taskDto =  service.addNewTask(requestBody);
        if(taskDto == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(taskDto);

    }

    @PutMapping("{id}")
    public ResponseEntity<TaskDTO> update(@PathVariable("id") Long id, @RequestBody TaskDTO requestBody) throws ResourcesNotFoundException, AuthenticationException {
        TaskDTO retDto = null;
        retDto = service.update(id, requestBody);

        if(retDto == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(retDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().body("Tarefa deletada");
    }

}
