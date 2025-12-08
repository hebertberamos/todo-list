package com.personal.todolist.servicies;

import com.personal.todolist.entitites.User;
import com.personal.todolist.entitites.dtos.UserDTO;
import com.personal.todolist.mappers.UserMapper;
import com.personal.todolist.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

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

    public Collection<UserDTO> allUsers() {
        Collection<User> users = repository.findAll();
        Collection<UserDTO> usersDto = new ArrayList<>();

        for(User user : users) {
            usersDto.add(new UserDTO(user.getName(), user.getEmail(), user.getPassword(), user.getRole(), user.getTasks()));
        }

        return usersDto;
    }

    public User findByLogin(String login) {
        User user = null;

        try {
            user = repository.findByEmail(login);
            if(user == null) {
                throw new RuntimeException("Null user in findByLogin method.");
            }

        } catch(Exception e) {
            System.out.println("Error in UserService - findByLogin: " + e);
        }

        return user;
    }
}
