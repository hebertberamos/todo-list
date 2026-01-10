package com.personal.todolist.controllers;

import com.personal.todolist.entitites.dtos.UserDTO;
import com.personal.todolist.servicies.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping

    public ResponseEntity<?> register(@RequestBody UserDTO userDto) {
        UserDTO retUser = service.register(userDto);
        return ResponseEntity.ok("Success!");
    }

}
