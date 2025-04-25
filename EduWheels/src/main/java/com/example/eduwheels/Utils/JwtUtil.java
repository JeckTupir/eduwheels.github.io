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

    // Replace with a more secure key in production
    private final String SECRET_KEY = "2bf3d6f5d0839c89b1a3f9d4c76c2b5fa453b3cf5f6b3f7b21b38c9f45a5ef8e"; // 🔐 Keep this safe!

    // Method to encode the secret key into Base64
    private byte[] getSecretKeyBytes() {
        // Encode the secret key into Base64 bytes before using it
        return Base64.getEncoder().encode(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email) {
        long expirationTime = 1000 * 60 * 60 * 10; // 10 hours

        // Use Base64-encoded key
        SecretKey key = Keys.hmacShaKeyFor(getSecretKeyBytes());

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String extractEmail(String token) {
        // Use Base64-encoded key
        SecretKey key = Keys.hmacShaKeyFor(getSecretKeyBytes());

        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            // Use Base64-encoded key
            SecretKey key = Keys.hmacShaKeyFor(getSecretKeyBytes());
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}