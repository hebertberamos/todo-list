package com.personal.todolist.controllers;

import com.personal.todolist.entitites.dtos.UserDTO;
import com.personal.todolist.security.SecurityService;
import com.personal.todolist.servicies.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/*
        - All users - ADMIN
        - Get user self data - just the user and ADMIN
        - Update user self data - just the user
        - Update user self password - Just the user and ADMIN
 */

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> save(@RequestBody UserDTO requestBody) {
        UserDTO userDto = null;

            userDto = service.save(requestBody);
            if(userDto == null) {
                return ResponseEntity.badRequest().body(null);
            }
            return ResponseEntity.ok(userDto);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Collection<UserDTO>> all(Authentication auth){
        Collection<UserDTO> collection = service.allUsers();
        return ResponseEntity.ok(collection);
    }

}
