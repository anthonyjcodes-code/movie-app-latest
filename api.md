# Cinema Booking System - API Documentation

## Base URL
```
http://localhost:8080/api/v1
```

---

## 🎬 Movie APIs

### GET /movies
**Purpose**: Get all movies in the database  
**Request**: No body required  
**Response**: Array of movie objects with full details

```json
[
  {
    "id": 1,
    "title": "Avatar: The Way of Water",
    "description": "Set more than a decade after the events...",
    "genre": "Action, Adventure, Sci-Fi",
    "language": "English",
    "duration": "3h 12min",
    "rating": "8.2",
    "releaseDate": "2022-12-16",
    "price": "250.00",
    "imageUrl": "/images/avatar.webp",
    "backdropUrl": "/images/avatar.webp",
    "director": "James Cameron",
    "cast": "Sam Worthington, Zoe Saldaña",
    "ageRating": "PG-13",
    "status": "Now Showing"
  }
]
```

### GET /movies/{id}
**Purpose**: Get specific movie by ID  
**Request**: Path parameter `id` (e.g., `/movies/1`)  
**Response**: Single movie object with all details

```json
{
  "id": 1,
  "title": "Avatar: The Way of Water",
  "description": "Set more than a decade after the events...",
  "genre": "Action, Adventure, Sci-Fi",
  "language": "English",
  "duration": "3h 12min",
  "rating": "8.2",
  "releaseDate": "2022-12-16",
  "price": "250.00",
  "imageUrl": "/images/avatar.webp",
  "backdropUrl": "/images/avatar.webp",
  "director": "James Cameron",
  "cast": "Sam Worthington, Zoe Saldaña",
  "ageRating": "PG-13",
  "status": "Now Showing"
}
```

### GET /movies/search?query={query}
**Purpose**: Search movies by title  
**Request**: Query parameter `query` (e.g., `?query=avatar`)  
**Response**: Array of matching movies

```json
[
  {
    "id": 1,
    "title": "Avatar: The Way of Water",
    "description": "Set more than a decade after the events...",
    "genre": "Action, Adventure, Sci-Fi",
    "rating": "8.2",
    "price": "250.00"
  }
]
```

### GET /movies/genre/{genre}
**Purpose**: Filter movies by genre  
**Request**: Path parameter `genre` (e.g., `/movies/genre/Action`)  
**Response**: Array of movies in that genre

```json
[
  {
    "id": 1,
    "title": "Avatar: The Way of Water",
    "genre": "Action, Adventure, Sci-Fi",
    "rating": "8.2",
    "price": "250.00"
  }
]
```

### GET /movies/status/{status}
**Purpose**: Filter movies by status  
**Request**: Path parameter `status` (e.g., `/movies/status/Now Showing`)  
**Response**: Array of movies with that status

```json
[
  {
    "id": 1,
    "title": "Avatar: The Way of Water",
    "status": "Now Showing",
    "rating": "8.2",
    "price": "250.00"
  }
]
```

---

## 🎥 Screen APIs

### GET /screens
**Purpose**: Get all cinema screens for admin/debugging  
**Request**: No body required  
**Response**: Array of screen objects

```json
[
  {
    "screenId": 1,
    "screenName": "Screen 1",
    "totalSeats": 120
  },
  {
    "screenId": 2,
    "screenName": "Screen 2",
    "totalSeats": 100
  }
]
```

---

## 🎭 Show APIs

### GET /movies/{movieId}/shows
**Purpose**: Get all shows for a specific movie  
**Request**: Path parameter `movieId` (e.g., `/movies/1/shows`)  
**Response**: Array of show information

```json
[
  {
    "showId": 1,
    "screenName": "Screen 1",
    "showDate": "2026-01-10",
    "showTime": "18:30",
    "ticketPrice": 280,
    "availableSeats": 90
  },
  {
    "showId": 2,
    "screenName": "Screen 1",
    "showDate": "2026-01-10",
    "showTime": "14:30",
    "ticketPrice": 250,
    "availableSeats": 120
  }
]
```

### GET /shows/{showId}
**Purpose**: Get detailed show information  
**Request**: Path parameter `showId` (e.g., `/shows/1`)  
**Response**: Complete show details

```json
{
  "showId": 1,
  "movieTitle": "Avatar: The Way of Water",
  "screenName": "Screen 1",
  "showDate": "2026-01-10",
  "showTime": "18:30",
  "price": 280,
  "availableSeats": 90
}
```

---

## 🎫 Booking APIs

### POST /bookings
**Purpose**: Create a new booking with seat selection  
**Request**: Booking details with show and seat count

```json
{
  "showId": 1,
  "seats": 2,
  "userId": 253
}
```

**Response**: Booking confirmation with order details

```json
{
  "orderId": 1001,
  "status": "CONFIRMED",
  "totalAmount": 560
}
```

### GET /bookings/{orderId}
**Purpose**: Get complete booking details for ticket page  
**Request**: Path parameter `orderId` (e.g., `/bookings/1001`)  
**Response**: Full booking information with seat numbers

```json
{
  "orderId": 1001,
  "movie": "Avatar: The Way of Water",
  "screen": "Screen 1",
  "date": "2026-01-10",
  "time": "18:30",
  "seats": [10, 11],
  "amount": 560,
  "status": "CONFIRMED"
}
```

### GET /users/{userId}/bookings
**Purpose**: Get booking history for a specific user  
**Request**: Path parameter `userId` (e.g., `/users/253/bookings`)  
**Response**: Array of user's bookings

```json
[
  {
    "orderId": 1001,
    "movie": "Avatar: The Way of Water",
    "date": "2026-01-10",
    "time": "18:30",
    "status": "CONFIRMED"
  },
  {
    "orderId": 1002,
    "movie": "Dune: Part Two",
    "date": "2026-01-11",
    "time": "19:00",
    "status": "CANCELLED"
  }
]
```

### POST /bookings/{orderId}/cancel
**Purpose**: Cancel a booking and restore available seats  
**Request**: Path parameter `orderId` (e.g., `/bookings/1001/cancel`)  
**Response**: Cancellation confirmation

```json
{
  "orderId": 1001,
  "status": "CANCELLED"
}
```

---

## 👤 User Authentication APIs

### POST /register
**Purpose**: Register a new user account  
**Request**: User registration details

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

**Response**: Created user information

```json
{
  "id": 253,
  "name": "Test User",
  "surname": null,
  "email": "test@example.com",
  "password": "$2a$10$KY.nFayOt1bGZCPnpovqCeYyAxMy/oh65kkbSDfyBhr0fsxxRqkoO",
  "loginEmail": null,
  "loginPassword": null
}
```

### POST /login
**Purpose**: Authenticate user and login  
**Request**: User login credentials

```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

**Response**: Login success with user information

```json
{
  "message": "Login successful",
  "userName": "Test User",
  "userId": 253
}
```

---

## 📊 Database Schema

### Movies Table
```sql
CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  genre VARCHAR(255),
  language VARCHAR(100),
  duration VARCHAR(50),
  rating DECIMAL(3,1),
  release_date DATE,
  price DECIMAL(10,2),
  image_url VARCHAR(500),
  backdrop_url VARCHAR(500),
  director VARCHAR(255),
  cast TEXT,
  age_rating VARCHAR(20),
  status VARCHAR(50) DEFAULT 'Now Showing'
);
```

### Screens Table
```sql
CREATE TABLE screens (
  screen_id INT AUTO_INCREMENT PRIMARY KEY,
  screen_name VARCHAR(100) NOT NULL,
  total_seats INT NOT NULL
);
```

### Shows Table
```sql
CREATE TABLE shows (
  show_id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT NOT NULL,
  screen_id INT NOT NULL,
  show_date DATE NOT NULL,
  show_time TIME NOT NULL,
  ticket_price DECIMAL(10,2) NOT NULL,
  available_seats INT NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (screen_id) REFERENCES screens(screen_id)
);
```

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  login_email VARCHAR(255),
  login_password VARCHAR(255)
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  show_id INT NOT NULL,
  user_id INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  seat_count INT NOT NULL,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'CONFIRMED',
  FOREIGN KEY (show_id) REFERENCES shows(show_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Order_Seats Table
```sql
CREATE TABLE order_seats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  seat_number INT NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(order_id)
);
```

---

## 🔧 Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## 🌐 CORS Configuration

### Allowed Origins
```
http://localhost:3000
http://localhost:3001
http://localhost:3002
http://localhost:3003
```

### Headers
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 📱 Usage Examples

### JavaScript Fetch Example
```javascript
// Get all movies
fetch('http://localhost:8080/api/v1/movies')
  .then(response => response.json())
  .then(movies => console.log(movies));

// Create booking
fetch('http://localhost:8080/api/v1/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    showId: 1,
    seats: 2,
    userId: 253
  })
})
.then(response => response.json())
.then(booking => console.log(booking));
```

### PowerShell Example
```powershell
# Get all movies
Invoke-RestMethod -Uri "http://localhost:8080/api/v1/movies" -Method Get

# Create booking
$body = @{
  showId = 1
  seats = 2
  userId = 253
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/v1/bookings" -Method Post -Body $body -ContentType "application/json"
```

---

## 🚀 Testing

### Sample Data
- **16 Movies**: Avatar, Dune, Oppenheimer, Barbie, etc.
- **3 Screens**: Screen 1 (120 seats), Screen 2 (100 seats), Screen 3 (80 seats)
- **14 Shows**: Multiple showtimes across different dates and screens

### Test Endpoints
```bash
# Test all endpoints
curl http://localhost:8080/api/v1/movies
curl http://localhost:8080/api/v1/screens
curl http://localhost:8080/api/v1/movies/1/shows
curl http://localhost:8080/api/v1/users/253/bookings
```

---

## 📝 Notes

- All datetime fields use ISO format
- Prices are stored as strings in database, converted to numbers in frontend
- Seat numbers are randomly assigned for simplicity
- User passwords are encrypted using BCrypt
- All endpoints return JSON responses
- Server runs on port 8080 by default
