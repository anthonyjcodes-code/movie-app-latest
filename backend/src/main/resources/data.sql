-- Sample data for Cinema Ticket Booking System
-- This file contains sample data for all tables

-- Insert sample users
INSERT INTO users (name, surname, email, password) VALUES 
('Anthony', 'Smith', 'anthony@gmail.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFDYZt/I5/BFnhkSLsVBDSC'), -- password: anthony
('John', 'Doe', 'john.doe@example.com', '$2a$10$sO3wLkwYwnV/ybmh9tY2qubsh7VaOSLQ821dTF9tIsGvqlMI1FADG'), -- password: password123
('Jane', 'Wilson', 'jane.wilson@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFDYZt/I5/BFnhkSLsVBDSC'), -- password: anthony
('Mike', 'Brown', 'mike.brown@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFDYZt/I5/BFnhkSLsVBDSC'), -- password: anthony
('Sarah', 'Davis', 'sarah.davis@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFDYZt/I5/BFnhkSLsVBDSC'); -- password: anthony

-- Insert sample orders
INSERT INTO orders (customer_id, user_name, order_date, movie_id, movie_title, movie_genres, movie_language, movie_price, movie_runtime, seat) VALUES 
(1, 'Anthony Smith', '2026-01-06', 1, 'Inception', 'Action,Sci-Fi,Thriller', 'English', 12.50, 148, '1,2,3'),
(2, 'John Doe', '2026-01-06', 2, 'The Dark Knight', 'Action,Crime,Drama', 'English', 15.00, 152, '4,5,6'),
(3, 'Jane Wilson', '2026-01-06', 3, 'Interstellar', 'Adventure,Drama,Sci-Fi', 'English', 13.75, 169, '7,8,9'),
(1, 'Anthony Smith', '2026-01-06', 4, 'The Matrix', 'Action,Sci-Fi', 'English', 11.25, 136, '10,11,12'),
(4, 'Mike Brown', '2026-01-06', 5, 'Pulp Fiction', 'Crime,Drama', 'English', 14.00, 154, '13,14,15'),
(5, 'Sarah Davis', '2026-01-06', 6, 'The Shawshank Redemption', 'Drama', 'English', 12.00, 142, '16,17,18'),
(2, 'John Doe', '2026-01-06', 7, 'Fight Club', 'Drama', 'English', 13.50, 139, '1,2,3'),
(3, 'Jane Wilson', '2026-01-06', 8, 'Forrest Gump', 'Comedy,Drama,Romance', 'English', 11.75, 142, '4,5,6'),
(4, 'Mike Brown', '2026-01-06', 9, 'The Godfather', 'Crime,Drama', 'English', 15.50, 175, '7,8,9'),
(5, 'Sarah Davis', '2026-01-06', 10, 'Goodfellas', 'Biography,Crime,Drama', 'English', 14.25, 146, '10,11,12');
