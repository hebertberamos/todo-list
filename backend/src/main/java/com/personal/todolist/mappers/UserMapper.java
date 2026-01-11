package com.personal.todolist.mappers;

import com.personal.todolist.entitites.User;
import com.personal.todolist.entitites.dtos.UserDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;;

@Configuration
public class UserMapper {

    public User toEntity(UserDTO dto){
        return new User(dto.getName(), dto.getEmail(), dto.getPassword(), dto.getRole());
    }

    public UserDTO toDto(User entity) {
       return new UserDTO(entity.getName(), entity.getEmail(), entity.getPassword(), entity.getRole());

    }

}
