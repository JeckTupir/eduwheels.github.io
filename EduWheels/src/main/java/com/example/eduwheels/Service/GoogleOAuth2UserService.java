package com.example.eduwheels.Service;

import com.example.eduwheels.Entity.UserEntity;
import com.example.eduwheels.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GoogleOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    // This method is called during Google OAuth2 login
    public UserEntity handleGoogleLogin(OAuth2User oAuth2User) {
        // Extract user information from the OAuth2User
        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");

        // Check if the user already exists in the database
        Optional<UserEntity> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            // Create a new user entity but leave schoolid as null (we'll update it later)
            UserEntity newUser = new UserEntity();
            newUser.setEmail(email);
            newUser.setFirstName(firstName);
            newUser.setLastName(lastName);
            newUser.setUsername(firstName + lastName); // Create a username from first and last names
            newUser.setPassword(""); // Leave password empty since the user logs in via Google

            // Save the new user to the database with a temporary schoolid value (null or empty)
            return userRepository.save(newUser);
        } else {
            // Optionally update existing user information if necessary
            UserEntity user = existingUser.get();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            userRepository.save(user);

            return user;
        }
    }
}