package com.cinema.backend.repositories;

import com.cinema.backend.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByGenreContaining(String genre);
    List<Movie> findByStatus(String status);
    List<Movie> findByTitleContainingIgnoreCase(String query);
}
