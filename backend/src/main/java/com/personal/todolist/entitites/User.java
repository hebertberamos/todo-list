package com.personal.todolist.entitites;

import com.personal.todolist.entitites.enums.UserRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false)
    private UserRole role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks = new ArrayList<>();

    public User() {}

    public User(String name, String email, String password, UserRole role) {
        this.name = name;
        this.email = email;
        this.password = password;

        if(role != null) {
            this.role = role;
        } else {
            this.role = UserRole.USER;
        }
    }

    public void addTask(Task task) {
        this.tasks.add(task);
        task.setUser(this);
    }

    public void removeTask(Task task) {
        this.tasks.remove(task);
        task.setUser(null);
    }
}
