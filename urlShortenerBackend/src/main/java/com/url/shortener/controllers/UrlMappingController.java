package com.url.shortener.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.User;
import com.url.shortener.service.UrlMappingService;
import com.url.shortener.service.UserService;

import lombok.AllArgsConstructor;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {

    UrlMappingService urlMappingService;
    UserService userService;

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')") // Only authenticated users can access this endpoint
    public ResponseEntity<UrlMappingDTO> createShortUrls(@RequestBody Map<String,String> request, Principal principal) {
        String originalUrl = request.get("originalurl");
        User user = userService.getUserByUsername(principal.getName());

        UrlMappingDTO urlMappingDto = urlMappingService.createShortUrl(originalUrl,user);

        return ResponseEntity.ok(urlMappingDto);
    }

    @PostMapping("/myurls")
    @PreAuthorize("hasRole('USER')") // Only authenticated users can access this endpoint
    public ResponseEntity<List<UrlMappingDTO>> fetchMyUrls( Principal principal) {

        User user = userService.getUserByUsername(principal.getName());
        List<UrlMappingDTO> urlMappingDtoList = urlMappingService.fetchUsersUrls(user);

        return ResponseEntity.ok(urlMappingDtoList);
    }


    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')") // Only authenticated users can access this endpoint
    public ResponseEntity<List<ClickEventDTO>> getAnalyticsOfShortUrl(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate,@PathVariable String shortUrl) {
        
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);

        List<ClickEventDTO> clickEventDtoList = urlMappingService.getClickEventsByDate(shortUrl, start, end);
        return ResponseEntity.ok(clickEventDtoList);
    }


    @GetMapping("/totalclicks")
    @PreAuthorize("hasRole('USER')") // Only authenticated users can access this endpoint
    public ResponseEntity<Map<LocalDate,Long>> getAnalyticsOfShortUrl(Principal principal,@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        
        User user = userService.getUserByUsername(principal.getName());
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        Map<LocalDate,Long> clickEventDtoList = urlMappingService.getTotalClicksByUser(user, start, end);
        return ResponseEntity.ok(clickEventDtoList);
    }
    
    
}
