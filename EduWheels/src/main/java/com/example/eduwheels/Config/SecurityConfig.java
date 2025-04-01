package com.example.eduwheels.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html",
                                "/webjars/**"
                        ).permitAll() // Allow Swagger UI access
                        .anyRequest().permitAll() // Allow all other requests
                )
                .csrf().disable()   // Disable CSRF
                .formLogin().disable() // Disable login page
                .httpBasic().disable(); // Disable basic authentication

        return http.build();
    }
}
