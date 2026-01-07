-- Database Migration Script for Cinema Ticket Booking System
-- Usage: mysql -u root -proot cinema < migration.sql

-- Clear existing data
DELETE FROM cinema_hall_updated_seats;
DELETE FROM cinema_hall;
DELETE FROM orders;
DELETE FROM users;

-- Reset auto-increment counters
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE orders AUTO_INCREMENT = 1;
ALTER TABLE cinema_hall AUTO_INCREMENT = 1;

-- Insert sample users
INSERT INTO users (id, name, surname, email, password) VALUES 
(1, 'Anthony', 'Smith', 'anthony@gmail.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFDYZt/I5/BFnhkSLsVBDSC'), -- password: anthony
(2, 'John', 'Doe', 'john.doe@example.com', '$2a$10$sO3wLkwYwnV/ybmh9tY2qubsh7VaOSLQ821dTF9tIsGvqlMI1FADG'), -- password: password123
(3, 'Jane', 'Wilson', 'jane.wilson@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFDYZt/I5/BFnhkSLsVBDSC'), -- password: anthony
(4, 'Mike', 'Brown', 'mike.brown@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFDYZt/I5/BFnhkSLsVBDSC'), -- password: anthony
(5, 'Sarah', 'Davis', 'sarah.davis@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFDYZt/I5/BFnhkSLsVBDSC'); -- password: anthony

-- Insert sample orders
INSERT INTO orders (order_id, created_at, customer_id, user_name, order_date, movie_id, movie_title, movie_genres, movie_language, movie_price, movie_runtime) VALUES 
(1, '2026-01-06 10:30:00', 1, 'Anthony Smith', '2026-01-06', 1, 'Inception', 'Action,Sci-Fi,Thriller', 'English', 12.50, 148),
(2, '2026-01-06 11:30:00', 2, 'John Doe', '2026-01-06', 2, 'The Dark Knight', 'Action,Crime,Drama', 'English', 15.00, 152),
(3, '2026-01-06 12:30:00', 3, 'Jane Wilson', '2026-01-06', 3, 'Interstellar', 'Adventure,Drama,Sci-Fi', 'English', 13.75, 169),
(4, '2026-01-06 13:30:00', 1, 'Anthony Smith', '2026-01-06', 4, 'The Matrix', 'Action,Sci-Fi', 'English', 11.25, 136),
(5, '2026-01-06 14:30:00', 4, 'Mike Brown', '2026-01-06', 5, 'Pulp Fiction', 'Crime,Drama', 'English', 14.00, 154),
(6, '2026-01-06 15:30:00', 5, 'Sarah Davis', '2026-01-06', 6, 'The Shawshank Redemption', 'Drama', 'English', 12.00, 142),
(7, '2026-01-06 16:30:00', 2, 'John Doe', '2026-01-06', 7, 'Fight Club', 'Drama', 'English', 13.50, 139),
(8, '2026-01-06 17:30:00', 3, 'Jane Wilson', '2026-01-06', 8, 'Forrest Gump', 'Comedy,Drama,Romance', 'English', 11.75, 142),
(9, '2026-01-06 18:30:00', 4, 'Mike Brown', '2026-01-06', 9, 'The Godfather', 'Crime,Drama', 'English', 15.50, 175),
(10, '2026-01-06 19:30:00', 5, 'Sarah Davis', '2026-01-06', 10, 'Goodfellas', 'Biography,Crime,Drama', 'English', 14.25, 146);

-- Insert sample cinema hall data for 10 movies with multiple sessions
-- Movie 1: Inception
INSERT INTO cinema_hall (id, movie_id, movie_session, order_time) VALUES 
(1, 1, '10:00', '2026-01-06 09:30:00'),
(2, 1, '14:00', '2026-01-06 13:30:00'),
(3, 1, '18:00', '2026-01-06 17:30:00'),
(4, 1, '21:00', '2026-01-06 20:30:00');

-- Movie 2: The Dark Knight
INSERT INTO cinema_hall (id, movie_id, movie_session, order_time) VALUES 
(5, 2, '11:00', '2026-01-06 10:30:00'),
(6, 2, '15:00', '2026-01-06 14:30:00'),
(7, 2, '19:00', '2026-01-06 18:30:00'),
(8, 2, '22:00', '2026-01-06 21:30:00');

-- Movie 3: Interstellar
INSERT INTO cinema_hall (id, movie_id, movie_session, order_time) VALUES 
(9, 3, '09:30', '2026-01-06 09:00:00'),
(10, 3, '13:30', '2026-01-06 13:00:00'),
(11, 3, '17:30', '2026-01-06 17:00:00'),
(12, 3, '20:30', '2026-01-06 20:00:00');

-- Movie 4: The Matrix
INSERT INTO cinema_hall (id, movie_id, movie_session, order_time) VALUES 
(13, 4, '10:30', '2026-01-06 10:00:00'),
(14, 4, '14:30', '2026-01-06 14:00:00'),
(15, 4, '18:30', '2026-01-06 18:00:00'),
(16, 4, '21:30', '2026-01-06 21:00:00');

-- Movie 5: Pulp Fiction
INSERT INTO cinema_hall (id, movie_id, movie_session, order_time) VALUES 
(17, 5, '11:30', '2026-01-06 11:00:00'),
(18, 5, '15:30', '2026-01-06 15:00:00'),
(19, 5, '19:30', '2026-01-06 19:00:00'),
(20, 5, '22:30', '2026-01-06 22:00:00');

-- Movie 6: The Shawshank Redemption
INSERT INTO cinema_hall (id, movie_id, movie_session, order_time) VALUES 
(21, 6, '09:00', '2026-01-06 08:30:00'),
(22, 6, '13:00', '2026-01-06 12:30:00'),
(23, 6, '17:00', '2026-01-06 16:30:00'),
(24, 6, '20:00', '2026-01-06 19:30:00');

-- Movie 7: Fight Club
INSERT INTO cinema_hall (id, movie_id, movie_session, order_time) VALUES 
(25, 7, '12:00', '2026-01-06 11:30:00'),
(26, 7, '16:00', '2026-01-06 15:30:00'),
(27, 7, '20:00', '2026-01-06 19:30:00'),
(28, 7, '23:00', '2026-01-06 22:30:00');

-- Movie 8: Forrest Gump
INSERT INTO cinema_hall (id, movie_id, movie_session, order_time) VALUES 
(29, 8, '10:00', '2026-01-06 09:30:00'),
(30, 8, '14:00', '2026-01-06 13:30:00'),
(31, 8, '18:00', '2026-01-06 17:30:00'),
(32, 8, '21:00', '2026-01-06 20:30:00');

-- Movie 9: The Godfather
INSERT INTO cinema_hall (id, movie_id, movie_session, order_time) VALUES 
(33, 9, '11:00', '2026-01-06 10:30:00'),
(34, 9, '15:00', '2026-01-06 14:30:00'),
(35, 9, '19:00', '2026-01-06 18:30:00'),
(36, 9, '22:00', '2026-01-06 21:30:00');

-- Movie 10: Goodfellas
INSERT INTO cinema_hall (id, movie_id, movie_session, order_time) VALUES 
(37, 10, '09:30', '2026-01-06 09:00:00'),
(38, 10, '13:30', '2026-01-06 13:00:00'),
(39, 10, '17:30', '2026-01-06 17:00:00'),
(40, 10, '21:30', '2026-01-06 21:00:00');

-- Insert seat data for each cinema hall (20 seats per hall)
INSERT INTO cinema_hall_updated_seats (cinema_hall_id, updated_seats) VALUES 
-- Hall 1 (Inception 10:00)
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
(1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18), (1, 19), (1, 20),
-- Hall 2 (Inception 14:00)
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10),
(2, 11), (2, 12), (2, 13), (2, 14), (2, 15), (2, 16), (2, 17), (2, 18), (2, 19), (2, 20),
-- Hall 3 (Inception 18:00)
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10),
(3, 11), (3, 12), (3, 13), (3, 14), (3, 15), (3, 16), (3, 17), (3, 18), (3, 19), (3, 20),
-- Hall 4 (Inception 21:00)
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10),
(4, 11), (4, 12), (4, 13), (4, 14), (4, 15), (4, 16), (4, 17), (4, 18), (4, 19), (4, 20),
-- Hall 5 (The Dark Knight 11:00)
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10),
(5, 11), (5, 12), (5, 13), (5, 14), (5, 15), (5, 16), (5, 17), (5, 18), (5, 19), (5, 20),
-- Hall 6 (The Dark Knight 15:00)
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), (6, 7), (6, 8), (6, 9), (6, 10),
(6, 11), (6, 12), (6, 13), (6, 14), (6, 15), (6, 16), (6, 17), (6, 18), (6, 19), (6, 20),
-- Hall 7 (The Dark Knight 19:00)
(7, 1), (7, 2), (7, 3), (7, 4), (7, 5), (7, 6), (7, 7), (7, 8), (7, 9), (7, 10),
(7, 11), (7, 12), (7, 13), (7, 14), (7, 15), (7, 16), (7, 17), (7, 18), (7, 19), (7, 20),
-- Hall 8 (The Dark Knight 22:00)
(8, 1), (8, 2), (8, 3), (8, 4), (8, 5), (8, 6), (8, 7), (8, 8), (8, 9), (8, 10),
(8, 11), (8, 12), (8, 13), (8, 14), (8, 15), (8, 16), (8, 17), (8, 18), (8, 19), (8, 20),
-- Additional halls for movies 3-10 (sample data)
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5), (9, 6), (9, 7), (9, 8), (9, 9), (9, 10),
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 6), (10, 7), (10, 8), (10, 9), (10, 10),
(11, 1), (11, 2), (11, 3), (11, 4), (11, 5), (11, 6), (11, 7), (11, 8), (11, 9), (11, 10),
(12, 1), (12, 2), (12, 3), (12, 4), (12, 5), (12, 6), (12, 7), (12, 8), (12, 9), (12, 10);
