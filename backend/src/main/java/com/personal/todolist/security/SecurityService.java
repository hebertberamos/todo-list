package com.personal.todolist.security;

import com.personal.todolist.entitites.User;
import com.personal.todolist.exceptions.FatalErrorException;
import com.personal.todolist.exceptions.ResourcesNotFoundException;
import com.personal.todolist.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityService {

    private final UserRepository userRepository;

    public User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new FatalErrorException("The User Authentication could not be found during the process to get authenticated user");
        }

        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String login = userDetails.getUsername();


        return userRepository.findByEmail(login).orElseThrow(() -> new ResourcesNotFoundException("User not found"));
    }

}
