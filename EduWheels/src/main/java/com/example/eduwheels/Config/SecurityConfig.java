package com.example.eduwheels.Config;

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

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors() // Enable CORS support in Spring Security
                .and()
                .authorizeRequests(auth -> auth
                        .requestMatchers(
                                "/",  // Root endpoint
                                "/login**",  // React page
                                "/error",  // Error page
                                "/users/signup",  // Signup API
                                "/users/login",  // Login API
                                "/users/google-login"  // Google login API
                        ).permitAll()  // Allow unauthenticated access to these endpoints
                        .anyRequest().authenticated()  // Secure all other endpoints
                )
                .csrf().disable()  // Disable CSRF protection (as you're using OAuth2)
                .formLogin().disable()  // Disable the default form login
                .httpBasic().disable()  // Disable basic HTTP auth
                .oauth2Login()  // Enable OAuth2 login
                .loginPage("/login") // Optional: Custom login page (if needed)
                .successHandler((request, response, authentication) -> {
                    OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
                    OAuth2User user = authToken.getPrincipal();
                    String email = user.getAttribute("email");
                    String firstName = user.getAttribute("given_name");
                    String lastName = user.getAttribute("family_name");

                    // Here, you can save user info to the database or take further action
                    // Optionally, you can redirect to a dashboard or a profile completion page

                    response.sendRedirect("http://localhost:3003/logged-in");
                })
                .failureHandler((request, response, exception) -> {
                    // Handle failure (e.g., if user cancels login)
                    response.sendRedirect("/login?error=true");
                });

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3003"));  // Specify the exact React frontend origin
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);  // Allow credentials (cookies, headers)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);  // Apply the CORS configuration to all paths
        return source;
    }
}
