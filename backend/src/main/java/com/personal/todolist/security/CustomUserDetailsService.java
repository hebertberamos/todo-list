package com.personal.todolist.security;

import com.personal.todolist.entitites.User;
import com.personal.todolist.servicies.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService service;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        User user = service.findByLogin(login);

        if(user == null) {
            throw new UsernameNotFoundException("Usuário no método loadUserByUsername, na classe CustomUserDetailsService não encontrado.");
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(String.valueOf(user.getRole()))
                .build();
    }
}
