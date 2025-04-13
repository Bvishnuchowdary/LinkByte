package com.url.shortener.security.jwt;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import com.url.shortener.service.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {

    @org.springframework.beans.factory.annotation.Value("${jwt.secret}")
    private String jwtSecret;

    @org.springframework.beans.factory.annotation.Value("${jwt.expiration}")
    private int jwtExpirationMs;

    // Authorization -> Bearer <token>
    public String getJwtFromHeader(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(bearerToken!=null && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }

    public String generateToken(UserDetailsImpl userDetailsImpl){
        String username = userDetailsImpl.getUsername();
        String roles = userDetailsImpl.getAuthorities().stream()
                       .map(authority -> authority.getAuthority())
                       .collect(Collectors.joining(","));
        
        return Jwts.builder()
               .subject(username)
               .claim("roles", roles)
               .issuedAt(new Date())
               .expiration(new Date((new Date().getTime()+jwtExpirationMs)))
               .signWith(key())
               .compact();
    }

    public String getUserNameFromJwtToken(String Token){
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build().parseSignedClaims(Token)
                .getPayload().getSubject();
                
    }

    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

   public Boolean validateToken(String authToken) {
        try {
            Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(authToken);

            return true;
        } catch (SecurityException | MalformedJwtException e) {
            System.out.println("Invalid JWT signature or format: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token is expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty: " + e.getMessage());
        } catch (JwtException e) {
            System.out.println("JWT error: " + e.getMessage());
        }
        return false;
    }
}
