package com.personal.todolist.controllers;

import com.personal.todolist.entitites.dtos.TaskDTO;
import com.personal.todolist.servicies.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;

    @PostMapping
    public ResponseEntity<String> save(@RequestBody TaskDTO requestBody) {
        TaskDTO taskDto = null;
        String retMessage = "";

        try{
            taskDto = service.addNewTask(requestBody);

            if(taskDto != null) {
                retMessage = "Nova task criada com sucesso";
            }

        } catch (Exception e) {
            System.out.println(e);
            retMessage = "Erro ao salvar nova task";
            ResponseEntity.badRequest().body(retMessage);
        }

        return ResponseEntity.ok(retMessage);
    }

}
