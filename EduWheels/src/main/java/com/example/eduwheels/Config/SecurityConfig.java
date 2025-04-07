package com.example.eduwheels.Config;

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
                                "/webjars/**",
                                "/", "/login**", "/error"
                        ).permitAll() // Allow Swagger + home/login/error
                        .anyRequest().authenticated() // Protect all other endpoints
                )
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .oauth2Login(); // Enable OAuth2 login

        return http.build();
    }
}
