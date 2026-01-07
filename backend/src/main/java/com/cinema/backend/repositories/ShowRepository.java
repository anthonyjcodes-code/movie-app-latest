package com.cinema.backend.repositories;

import com.cinema.backend.models.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowRepository extends JpaRepository<Show, Integer> {
    List<Show> findByMovieIdOrderByShowDateAscShowTimeAsc(Integer movieId);
    Show findByShowId(Integer showId);
}
