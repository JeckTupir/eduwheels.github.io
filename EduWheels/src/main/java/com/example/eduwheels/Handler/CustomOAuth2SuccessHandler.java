package com.example.eduwheels.Handler;

import com.example.eduwheels.Entity.UserEntity;
import com.example.eduwheels.Service.GoogleOAuth2UserService;
import com.example.eduwheels.Utils.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final GoogleOAuth2UserService googleOAuth2UserService;
    private final JwtUtil jwtUtil;

    public static final String PENDING_OAUTH2_USER_ATTRIBUTE_KEY = "pendingOAuth2UserDetails";

    public CustomOAuth2SuccessHandler(GoogleOAuth2UserService googleOAuth2UserService, JwtUtil jwtUtil) {
        this.googleOAuth2UserService = googleOAuth2UserService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        UserEntity user = googleOAuth2UserService.prepareOrFetchUser(oAuth2User);

        if (user.getUserid() == null || user.getSchoolid() == null || user.getSchoolid().trim().isEmpty()) {
            // Save details temporarily in session for profile completion
            HttpSession session = request.getSession();
            Map<String, String> pendingUserDetails = new HashMap<>();
            pendingUserDetails.put("email", oAuth2User.getAttribute("email"));
            pendingUserDetails.put("firstName", oAuth2User.getAttribute("given_name"));
            pendingUserDetails.put("lastName", oAuth2User.getAttribute("family_name"));
            session.setAttribute(PENDING_OAUTH2_USER_ATTRIBUTE_KEY, pendingUserDetails);

            response.sendRedirect("http://localhost:3000/complete-profile");
        } else {
            // Generate JWT and redirect
            String token = jwtUtil.generateToken(user.getEmail());
            response.sendRedirect("http://localhost:3000/logged-in?token=" + token);
        }
    }
}