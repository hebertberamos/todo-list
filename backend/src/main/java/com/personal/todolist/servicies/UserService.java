package com.personal.todolist.servicies;

import com.personal.todolist.entitites.User;
import com.personal.todolist.entitites.dtos.UserDTO;
import com.personal.todolist.entitites.enums.UserRole;
import com.personal.todolist.exceptions.ResourcesNotFoundException;
import com.personal.todolist.exceptions.UnauthorizedException;
import com.personal.todolist.mappers.UserMapper;
import com.personal.todolist.repositories.UserRepository;
import com.personal.todolist.security.SecurityService;
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
    private final SecurityService securityService;


    public UserDTO save(UserDTO dto) {
        User authUser = securityService.getAuthenticatedUser();

        if(authUser.getRole() != UserRole.ADMIN) {
            throw new UnauthorizedException("Sorry, you haven't authorization complete this request");
        }

        User user = mapper.toEntity(dto);
        String encodedPassword = encoder.encode(dto.getPassword());
        user.setPassword(encodedPassword);
        user = repository.save(user);
        dto = mapper.toDto(user);

        return dto;
    }

    public Collection<UserDTO> allUsers() {
        User authUser = securityService.getAuthenticatedUser();

        if(authUser.getRole() != UserRole.ADMIN) {
            throw new UnauthorizedException("Sorry, you haven't authorization complete this request");
        }

        Collection<User> users = repository.findAll();
        Collection<UserDTO> usersDto = new ArrayList<>();

        for(User user : users) {
            usersDto.add(new UserDTO(user.getName(), user.getEmail(), user.getPassword(), user.getRole(), user.getTasks()));
        }

        return usersDto;
    }

    public User findByLogin(String login) {
        User authUser = securityService.getAuthenticatedUser();

        if(authUser.getRole() != UserRole.ADMIN) {
            throw new UnauthorizedException("Sorry, you haven't authorization complete this request");
        }

        return repository.findByEmail(login).orElseThrow(() -> new ResourcesNotFoundException("User not found"));
    }
}
