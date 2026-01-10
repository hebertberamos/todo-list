package com.personal.todolist.servicies;

import com.personal.todolist.entitites.User;
import com.personal.todolist.entitites.dtos.UserDTO;
import com.personal.todolist.exceptions.FatalErrorException;
import com.personal.todolist.mappers.UserMapper;
import com.personal.todolist.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper mapper;
    private final PasswordEncoder encoder;

    public UserDTO register(UserDTO dto) {
        if(dto == null) {
            throw new FatalErrorException("Something wrong. Any user information was received.");
        }

        User user = mapper.toEntity(dto);

        if(user == null) {
            throw new FatalErrorException("Something wrong. User couldn't be created.");
        }

        String encodedPassword = encoder.encode(dto.getPassword());
        user.setPassword(encodedPassword);
        user = userRepository.save(user);
        dto = mapper.toDto(user);

        return dto;
    }

}
