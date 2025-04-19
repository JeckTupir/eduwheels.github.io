package com.example.eduwheels.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors() // Enable CORS support in Spring Security
                .and()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/login**",          // your React page
                                "/error",
                                "/users/signup",     // signup API
                                "/users/login"       // <— allow login API
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .oauth2Login()
                .loginPage("/login") // Optional: Custom login page (if needed)
                .successHandler((request, response, authentication) -> {
                    // Handle login success, here you can extract user info from OAuth2 authentication
                    // Example: authenticate using user data, or just redirect to a dashboard page
                    // You can extract the user information like this:
                    OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
                    OAuth2User user = authToken.getPrincipal();
                    // Then you can extract details like:
                    String email = user.getAttribute("email");
                    String firstName = user.getAttribute("given_name");
                    String lastName = user.getAttribute("family_name");

                    // You can then save this information to your database or take other actions.
                    // Here you can call a service to save or update the user.
                })
                .failureHandler((request, response, exception) -> {
                    // Handle failure, e.g., user canceled login
                    response.sendRedirect("/login?error=true");
                });

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}