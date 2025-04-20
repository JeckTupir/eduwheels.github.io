package com.example.eduwheels.Controller; // ✅ Fixed package name (lowercase)

import com.example.eduwheels.Entity.UserEntity; // ✅ Fixed import (lowercase)
import com.example.eduwheels.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping("/signup")  // Modified to /signup endpoint
    public ResponseEntity<UserEntity> signUp(@RequestBody UserEntity user) {
        try {
            // Check if user already exists
            if (userService.userExists(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(null);  // Return bad request if email exists
            }

            // Create the user
            UserEntity createdUser = userService.createUser(user);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);  // Return an error response if any issues
        }
    }

      


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

