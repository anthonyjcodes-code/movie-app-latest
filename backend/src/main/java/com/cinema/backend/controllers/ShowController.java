package com.cinema.backend.controllers;

import com.cinema.backend.models.Show;
import com.cinema.backend.repositories.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"})
public class ShowController {

    @Autowired
    private ShowRepository showRepository;

    @GetMapping("/api/v1/movies/{movieId}/shows")
    public ResponseEntity<List<Map<String, Object>>> getShowsForMovie(@PathVariable Integer movieId) {
        List<Show> shows = showRepository.findByMovieIdOrderByShowDateAscShowTimeAsc(movieId);
        
        List<Map<String, Object>> response = shows.stream().map(show -> {
            Map<String, Object> showData = new HashMap<>();
            showData.put("showId", show.getShowId());
            showData.put("screenName", show.getScreen().getScreenName());
            showData.put("showDate", show.getShowDate().toString());
            showData.put("showTime", show.getShowTime().toString());
            showData.put("ticketPrice", show.getTicketPrice());
            showData.put("availableSeats", show.getAvailableSeats());
            return showData;
        }).toList();
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/v1/shows/{showId}")
    public ResponseEntity<Map<String, Object>> getShowDetails(@PathVariable Integer showId) {
        Show show = showRepository.findByShowId(showId);
        
        if (show == null) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("showId", show.getShowId());
        response.put("movieTitle", show.getMovie().getTitle());
        response.put("screenName", show.getScreen().getScreenName());
        response.put("showDate", show.getShowDate().toString());
        response.put("showTime", show.getShowTime().toString());
        response.put("price", show.getTicketPrice());
        response.put("availableSeats", show.getAvailableSeats());
        
        return ResponseEntity.ok(response);
    }
}
