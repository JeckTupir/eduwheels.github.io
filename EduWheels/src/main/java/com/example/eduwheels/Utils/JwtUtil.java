package com.example.eduwheels.Utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    // Replace with a more secure key in production (Base64-encoded)
    private final String SECRET_KEY = "2bf3d6f5d0839c89b1a3f9d4c76c2b5fa453b3cf5f6b3f7b21b38c9f45a5ef8e";

    private SecretKey getSigningKey() {
        byte[] keyBytes = Base64.getEncoder()
                .encode(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Generate a JWT token containing the email as subject and username as a custom claim.
     *
     * @param email    the user email to be set as subject
     * @param username the user username to be set as a custom claim
     * @return the JWT token string
     */
    public String generateToken(String email, String username) {
        long expirationTime = 1000 * 60 * 60 * 10; // 10 hours

        return Jwts.builder()
                .setSubject(email)
                .claim("username", username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Extract email (subject) from JWT token
     */
    public String extractEmail(String token) {
        return parseClaims(token).getSubject();
    }

    /**
     * Extract username claim from JWT token
     */
    public String extractUsername(String token) {
        return parseClaims(token).get("username", String.class);
    }

    /**
     * Validate the token (signature and expiration)
     */
    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
