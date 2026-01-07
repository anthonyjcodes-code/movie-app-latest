# Cinema Booking System - HTML Pages Integration Guide

## 🎯 Complete Navigation Flow

### 1. Login Page (React App) → Movie Listing Page
- **File**: `src/App.tsx` (React)
- **Action**: After successful login, redirect to HTML movie listing
- **URL**: `/src/htmls/movie-listing.html`
- **Code**: `window.location.href = '/src/htmls/movie-listing.html';`

### 2. Movie Listing Page Navigation
- **File**: `src/htmls/movie-listing.html`
- **Actions**:
  - Click "View Details" → `movie-details.html?id={movieId}`
  - Click "Book" → `movie-details.html?id={movieId}`
  - Search/Filter → Refresh movie list in real-time

### 3. Movie Details Page Navigation
- **File**: `src/htmls/movie-details.html`
- **Actions**:
  - Click "Book Now" → `seat-booking.html?showId={showId}`
  - Back button → Previous page or movie listing

### 4. Seat Selection/Booking Page Navigation
- **File**: `src/htmls/seat-booking.html`
- **Actions**:
  - Confirm Booking → `booking-confirmation.html?orderId={orderId}`
  - Back button → Previous page

### 5. Booking Confirmation Page Navigation
- **File**: `src/htmls/booking-confirmation.html`
- **Actions**:
  - "Back to Movie Listing" → `movie-listing.html`
  - "Go to My Bookings" → `my-bookings.html`

### 6. My Bookings Page Navigation
- **File**: `src/htmls/my-bookings.html`
- **Actions**:
  - Click "View Details" → `booking-confirmation.html?orderId={orderId}`
  - Cancel Booking → Updates list with API call

## 🔗 API Integration Points

### Shared API Base URL
```javascript
const API_BASE_URL = 'http://localhost:8080/api/v1';
```

### User Authentication
- **Login**: `POST /api/v1/login`
- **Register**: `POST /api/v1/register`
- **User Data**: Stored in `localStorage` as `loginResponse`

### Movie APIs
- **All Movies**: `GET /api/v1/movies`
- **Movie Details**: `GET /api/v1/movies/{id}`
- **Search**: `GET /api/v1/movies/search?query={query}`
- **Genre Filter**: `GET /api/v1/movies/genre/{genre}`
- **Status Filter**: `GET /api/v1/movies/status/{status}`

### Show APIs
- **Movie Shows**: `GET /api/v1/movies/{movieId}/shows`
- **Show Details**: `GET /api/v1/shows/{showId}`

### Booking APIs
- **Create Booking**: `POST /api/v1/bookings`
- **Booking Details**: `GET /api/v1/bookings/{orderId}`
- **User Bookings**: `GET /api/v1/users/{userId}/bookings`
- **Cancel Booking**: `POST /api/v1/bookings/{orderId}/cancel`

## 📁 File Structure

```
frontendv1/
├── src/
│   ├── App.tsx (React - Login/Registration)
│   ├── htmls/
│   │   ├── movie-listing.html
│   │   ├── movie-details.html
│   │   ├── seat-booking.html
│   │   ├── booking-confirmation.html
│   │   ├── my-bookings.html
│   │   └── search-filter-bar.html
│   └── api.js (Shared API functions)
```

## 🔄 Data Flow

### User Session Management
```javascript
// After login, user data is stored:
localStorage.setItem('loginResponse', JSON.stringify({
    message: "Login successful",
    userName: "Test User",
    userId: 253
}));

// Retrieved in all pages:
const userData = JSON.parse(localStorage.getItem('loginResponse') || '{}');
const userId = userData.userId || 1;
```

### URL Parameters
- **Movie Details**: `?id={movieId}`
- **Seat Selection**: `?showId={showId}`
- **Booking Confirmation**: `?orderId={orderId}`

## 🎨 UI/UX Consistency

### Shared Design Elements
- **Color Scheme**: Dark theme with blue accents
- **Typography**: Consistent font sizes and weights
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

### Component Library
- **Tailwind CSS**: For styling
- **Font Awesome**: For icons
- **Custom CSS**: For specific animations and effects

## 🔧 Integration Steps

### 1. Backend Setup
- Ensure all APIs are running on `http://localhost:8080`
- Test all endpoints with the provided API test suite

### 2. Frontend Setup
- Place all HTML files in `src/htmls/` directory
- Update React App.tsx to redirect to HTML pages
- Ensure CORS is configured for port 3003

### 3. Testing Flow
1. **Login** → Movie Listing
2. **Browse Movies** → Movie Details
3. **Select Show** → Seat Selection
4. **Confirm Booking** → Booking Confirmation
5. **View Bookings** → My Bookings

## 🚀 Deployment Notes

### Static File Serving
- HTML files need to be served statically
- Update web server configuration for HTML files
- Ensure proper MIME types are set

### CORS Configuration
```java
// In WebConfig.java and BackendApplication.java
@CrossOrigin(origins = {"http://localhost:3003"})
```

### Environment Variables
```javascript
// Can be configured for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';
```

## 🐛 Troubleshooting

### Common Issues
1. **404 Errors**: Check file paths and server configuration
2. **CORS Errors**: Verify backend CORS settings
3. **API Errors**: Check backend server status
4. **Navigation Issues**: Verify URL parameters and paths

### Debug Tools
- **Browser Console**: Check for JavaScript errors
- **Network Tab**: Monitor API calls
- **Local Storage**: Verify user session data

## 📱 Mobile Compatibility

All pages are responsive and work on:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)

## 🔐 Security Considerations

- **User sessions** stored in localStorage
- **API calls** use proper HTTP methods
- **Input validation** on both frontend and backend
- **HTTPS** recommended for production

## 🎉 Features Summary

### ✅ Implemented Features
- ✅ Complete user authentication flow
- ✅ Movie browsing with search/filter
- ✅ Show selection and seat booking
- ✅ Booking confirmation with tickets
- ✅ User booking history management
- ✅ Real-time booking cancellation
- ✅ Responsive design for all devices
- ✅ Modern UI with animations
- ✅ Error handling and loading states

### 🔄 Integration Complete
The HTML pages are fully integrated with proper navigation flow, API connectivity, and consistent user experience throughout the entire cinema booking system.
