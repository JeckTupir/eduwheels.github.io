package com.example.eduwheels.Controller;


import org.springframework.ui.Model;
import com.example.eduwheels.Entity.UserEntity;
import com.example.eduwheels.Service.GoogleOAuth2UserService;
import com.example.eduwheels.Service.UserService;
import com.example.eduwheels.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/users")
class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/api/user")
    public Map<String, Object> getUser(@AuthenticationPrincipal OAuth2User principal) {
        return principal.getAttributes();
    }

    @GetMapping("/user")
    public String userInfo(@AuthenticationPrincipal OAuth2User user) {
        return "Hello, " + user.getAttribute("name");
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserEntity user) {
        if (userService.userExists(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message","Email already in use"));
        }
        UserEntity created = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping
    public UserEntity createUser(@RequestBody UserEntity user) {
        return userService.createUser(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String,String> payload) {
        String schoolid = payload.get("schoolid");
        String password = payload.get("password");
        if (schoolid==null || password==null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message","Missing credentials"));
        }
        return userRepository.findBySchoolid(schoolid)
                .filter(u -> u.getPassword().equals(password))  // plain text for now
                .map(u -> {
                    var data = Map.<String,Object>of(
                            "id", u.getUserid(),
                            "name", u.getFirstName()+" "+u.getLastName(),
                            "email", u.getEmail(),
                            "schoolid", u.getSchoolid()
                    );
                    return ResponseEntity.ok(data);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message","Invalid ID or password")));
    }

    @Autowired
    private GoogleOAuth2UserService googleOAuth2UserService;  // Google login service

    // Google Login - Fetch user from OAuth2 service
    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody OAuth2User oAuth2User) {
        // Handle Google login and get the user details
        UserEntity user = googleOAuth2UserService.handleGoogleLogin(oAuth2User);

        // If user is newly created or updated, return the user data (with a prompt to complete their profile)
        if (user.getSchoolid() == null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of("message", "Google login successful. Please provide your school ID."));
        }

        return ResponseEntity.ok(Map.of("message", "Google login successful", "user", user));
    }

    @GetMapping("/complete-profile")
    public String completeProfile(@AuthenticationPrincipal OAuth2User oAuth2User, Model model) {
        // Get the existing user (who logged in with Google)
        String email = oAuth2User.getAttribute("email");
        UserEntity user = userRepository.findByEmail(email).orElse(null);

        if (user != null) {
            // Add the user to the model to prefill data (such as first name, last name, email)
            model.addAttribute("user", user);
            return "complete-profile"; // The view name where the user will provide the schoolid
        }

        return "redirect:/login"; // Redirect to login if user is not found (shouldn't happen)
    }

    // This method will handle the form submission of the schoolid
    @PostMapping("/complete-profile")
    public String saveSchoolId(@RequestParam("schoolid") String schoolid, @AuthenticationPrincipal OAuth2User oAuth2User) {
        String email = oAuth2User.getAttribute("email");
        UserEntity user = userRepository.findByEmail(email).orElse(null);

        if (user != null) {
            user.setSchoolid(schoolid); // Save the schoolid
            userRepository.save(user); // Save updated user

            // Redirect to a success page or dashboard
            return "redirect:/dashboard"; // Adjust as needed
        }

        return "redirect:/login"; // Redirect to login if user is not found (shouldn't happen)
    }

    // Method for updating the user's schoolid after Google login
    @PostMapping("/update-schoolid")
    public ResponseEntity<?> updateSchoolId(@RequestParam String schoolid, @RequestParam Long userId) {
        Optional<UserEntity> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            user.setSchoolid(schoolid);
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("message", "School ID updated successfully."));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
    }


}