package com.cinema.backend.controllers;

import com.cinema.backend.models.Screen;
import com.cinema.backend.repositories.ScreenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"})
public class ScreenController {

    @Autowired
    private ScreenRepository screenRepository;

    @GetMapping("/api/v1/screens")
    public ResponseEntity<List<Screen>> getAllScreens() {
        List<Screen> screens = screenRepository.findAll();
        return ResponseEntity.ok(screens);
    }
}
