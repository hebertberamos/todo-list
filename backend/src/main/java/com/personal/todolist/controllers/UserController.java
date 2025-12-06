package com.personal.todolist.controllers;

import com.personal.todolist.entitites.dtos.UserDTO;
import com.personal.todolist.servicies.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    public ResponseEntity<UserDTO> save(@RequestBody UserDTO requestBody) {
        UserDTO userDto = null;

        try{
            userDto = service.save(requestBody);
            if(userDto == null) {
                return ResponseEntity.badRequest().body(null);
            }
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body(null);
        }
    }

}
