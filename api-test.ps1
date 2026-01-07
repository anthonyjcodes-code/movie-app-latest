#start test by 
# powershell -ExecutionPolicy Bypass -File "api-test.ps1"

# Cinema Ticket Booking API Test Suite
Write-Host "========================================"
Write-Host "Cinema Ticket Booking API Test Suite"
Write-Host "========================================"
Write-Host ""

$successCount = 0
$failCount = 0
$serverUrl = "http://localhost:8080"

# Test 1: User Registration
Write-Host "[1/8] Testing User Registration API"
try {
    $response = Invoke-RestMethod -Uri "$serverUrl/api/v1/register" -Method Post -ContentType "application/json" -Body '{"name":"Test User","email":"test@example.com","password":"test123"}' -ErrorAction Stop
    Write-Host "[SUCCESS] User Registration"
    $successCount++
    $response | ConvertTo-Json -Compress
} catch {
    Write-Host "[FAILED] User Registration"
    $failCount++
    $_.Exception.Message
}
Write-Host ""

# Test 2: User Login - Valid Credentials
Write-Host "[2/8] Testing User Login API (Valid Credentials)"
try {
    $response = Invoke-RestMethod -Uri "$serverUrl/api/v1/login" -Method Post -ContentType "application/json" -Body '{"email":"testuser@example.com","password":"test123"}' -ErrorAction Stop
    if ($response.message -eq "Login successful") {
        Write-Host "[SUCCESS] User Login - Valid"
        $successCount++
    } else {
        Write-Host "[FAILED] User Login - Valid"
        $failCount++
    }
    $response | ConvertTo-Json -Compress
} catch {
    Write-Host "[FAILED] User Login - Valid"
    $failCount++
    $_.Exception.Message
}
Write-Host ""

# Test 3: User Login - Invalid Credentials (Expected to fail)
Write-Host "[3/8] Testing User Login API (Invalid Credentials)"
try {
    $response = Invoke-RestMethod -Uri "$serverUrl/api/v1/login" -Method Post -ContentType "application/json" -Body '{"email":"invalid@example.com","password":"wrong"}' -ErrorAction Stop
    Write-Host "[FAILED] User Login - Invalid (Should have failed)"
    $failCount++
    $response | ConvertTo-Json -Compress
} catch {
    if ($_.Exception.Message -like "*401*") {
        Write-Host "[SUCCESS] User Login - Invalid (Expected failure)"
        $successCount++
    } else {
        Write-Host "[FAILED] User Login - Invalid"
        $failCount++
    }
    $_.Exception.Message
}
Write-Host ""

# Test 4: Get Cinema Hall - Existing Movie
Write-Host "[4/8] Testing Cinema Hall GET API (Existing Movie)"
try {
    $response = Invoke-RestMethod -Uri "$serverUrl/api/v1/movie/1/10:00" -Method Get -ErrorAction Stop
    Write-Host "[SUCCESS] Get Cinema Hall - Existing"
    $successCount++
    $response | ConvertTo-Json -Compress
} catch {
    Write-Host "[FAILED] Get Cinema Hall - Existing"
    $failCount++
    $_.Exception.Message
}
Write-Host ""

# Test 5: Get Cinema Hall - Non-existing Movie (Expected to fail)
Write-Host "[5/8] Testing Cinema Hall GET API (Non-existing Movie)"
try {
    $response = Invoke-RestMethod -Uri "$serverUrl/api/v1/movie/999/99:99" -Method Get -ErrorAction Stop
    Write-Host "[FAILED] Get Cinema Hall - Non-existing (Should have failed)"
    $failCount++
    $response | ConvertTo-Json -Compress
} catch {
    if ($_.Exception.Message -like "*404*") {
        Write-Host "[SUCCESS] Get Cinema Hall - Non-existing (Expected failure)"
        $successCount++
    } else {
        Write-Host "[FAILED] Get Cinema Hall - Non-existing"
        $failCount++
    }
    $_.Exception.Message
}
Write-Host ""

# Test 6: Update Cinema Hall Seats
Write-Host "[6/8] Testing Cinema Hall PUT API (Update Seats)"
try {
    $response = Invoke-RestMethod -Uri "$serverUrl/api/v1/movie/1/10:00" -Method Put -ContentType "application/json" -Body '{"updatedSeats":[1,2,3,4,5]}' -ErrorAction Stop
    if ($response.message -like "*successfully*") {
        Write-Host "[SUCCESS] Update Cinema Hall Seats"
        $successCount++
    } else {
        Write-Host "[FAILED] Update Cinema Hall Seats"
        $failCount++
    }
    $response | ConvertTo-Json -Compress
} catch {
    Write-Host "[FAILED] Update Cinema Hall Seats"
    $failCount++
    $_.Exception.Message
}
Write-Host ""

# Test 7: Create Order
Write-Host "[7/8] Testing Order Creation API"
try {
    $response = Invoke-RestMethod -Uri "$serverUrl/api/v1/order" -Method Post -ContentType "application/json" -Body '{"customerId":1,"userName":"Test User","orderDate":"2026-01-06","movieId":1,"movieTitle":"Test Movie","movieGenres":"Action","movieLanguage":"English","moviePrice":12.50,"movieRuntime":120}' -ErrorAction Stop
    Write-Host "[SUCCESS] Create Order"
    $successCount++
    $response | ConvertTo-Json -Compress
} catch {
    Write-Host "[FAILED] Create Order"
    $failCount++
    $_.Exception.Message
}
Write-Host ""

# Test 8: Get Order by User ID
Write-Host "[8/8] Testing Get Order by User ID API"
try {
    $response = Invoke-RestMethod -Uri "$serverUrl/api/v1/order/1" -Method Get -ErrorAction Stop
    Write-Host "[SUCCESS] Get Order by User ID"
    $successCount++
    $response | ConvertTo-Json -Compress
} catch {
    Write-Host "[FAILED] Get Order by User ID"
    $failCount++
    $_.Exception.Message
}
Write-Host ""

# Results Summary
Write-Host "========================================"
Write-Host "API Test Results Summary"
Write-Host "========================================"
Write-Host "Total Tests: 8"
Write-Host "Success: $successCount"
Write-Host "Failed: $failCount"
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "[RESULT] All API tests passed!"
} else {
    Write-Host "[RESULT] Some API tests failed!"
}

Write-Host "========================================"

Read-Host "Press Enter to exit"
