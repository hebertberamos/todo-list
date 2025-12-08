package com.personal.todolist.controllers;

import com.personal.todolist.entitites.dtos.UserDTO;
import com.personal.todolist.servicies.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
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

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Collection<UserDTO>> all(Authentication auth){

        System.out.println(auth);

        Collection<UserDTO> collection = service.allUsers();
        return ResponseEntity.ok(collection);
    }

}
