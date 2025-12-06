package com.personal.todolist.servicies;

import com.personal.todolist.entitites.User;
import com.personal.todolist.entitites.dtos.UserDTO;
import com.personal.todolist.mappers.UserMapper;
import com.personal.todolist.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final UserMapper mapper;

    //Add new user
    public UserDTO save(UserDTO dto) {
        try {
            User user = mapper.toEntity(dto);

            String encodedPassword = encoder.encode(dto.getPassword());
            user.setPassword(encodedPassword);

            user = repository.save(user);
            dto = mapper.toDto(user);

        } catch (Exception e) {
            System.out.println("Error in UserService - save method - " + e);
            dto = null;
        }


        return dto;
    }

}
