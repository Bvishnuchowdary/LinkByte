package com.url.shortener.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("/verifyauth")
    public String checkAuthWorking(@RequestParam String param) {
        return "Auth endpoint is working! " + param;
    }
}
