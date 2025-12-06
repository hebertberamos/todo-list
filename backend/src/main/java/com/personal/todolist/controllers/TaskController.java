package com.personal.todolist.controllers;

import com.personal.todolist.entitites.dtos.TaskDTO;
import com.personal.todolist.servicies.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAll() {
        try {
            List<TaskDTO> retList = service.getAll();
            if(retList == null) {
                return ResponseEntity.badRequest().body(null);
            }
            return ResponseEntity.ok(retList);
        } catch(Exception e) {
            //TODO: Use log generation here
            System.out.println(e);
            return ResponseEntity.badRequest().body(null);
        }

    }

    @PostMapping
    public ResponseEntity<TaskDTO> save(@RequestBody TaskDTO requestBody) {
        TaskDTO taskDto = null;

        try{
            taskDto = service.addNewTask(requestBody);
            if(taskDto == null) {
                return ResponseEntity.badRequest().body(null);
            }
            return ResponseEntity.ok(taskDto);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<TaskDTO> update(@PathVariable("id") Long id, @RequestBody TaskDTO requestBody) {
        TaskDTO retDto = null;

        try {
            retDto = service.update(id, requestBody);

            if(retDto == null) {
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok(retDto);
        } catch(Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        return service.delete(id);
    }

}
