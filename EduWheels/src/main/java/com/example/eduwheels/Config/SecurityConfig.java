package com.example.eduwheels.Config;

import com.example.eduwheels.Entity.UserEntity;
import com.example.eduwheels.Repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {
    private final UserRepository userRepository;

    // Constructor injection for UserRepository
    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .authorizeRequests(auth -> auth
                        .requestMatchers(
                                "/", "/login**", "/error",
                                "/users/signup", "/users/login", "/users/google-login"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic().disable()
                .oauth2Login()
                .loginPage("/login")
                .successHandler((request, response, authentication) -> {
                    OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
                    OAuth2User user = authToken.getPrincipal();

                    String email = user.getAttribute("email");
                    String firstName = user.getAttribute("given_name");
                    String lastName = user.getAttribute("family_name");

                    UserEntity existingUser = userRepository.findByEmail(email).orElse(null);
                    UserEntity userEntity;

                    if (existingUser == null) {
                        userEntity = new UserEntity();
                        userEntity.setEmail(email);
                        userEntity.setFirstName(firstName);
                        userEntity.setLastName(lastName);
                        userRepository.save(userEntity);

                        response.sendRedirect("http://localhost:3000/complete-profile?userId=" + userEntity.getUserid());
                    } else {
                        response.sendRedirect("http://localhost:3000/logged-in");
                    }
                })
                .failureHandler((request, response, exception) -> {
                    response.sendRedirect("/login?error=true");
                });

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));  // Specify React frontend origin
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);  // Allow credentials (cookies, headers)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);  // Apply the CORS configuration to all paths
        return source;
    }
}
