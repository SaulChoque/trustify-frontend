# Test Admin Page Script
# This script opens the admin page in the browser

Write-Host "🧪 Testing Admin Page..." -ForegroundColor Green

# Check if frontend is running
$frontendRunning = netstat -an | findstr ":3000" | findstr "LISTENING"
if ($frontendRunning) {
    Write-Host "✅ Frontend is running on port 3000" -ForegroundColor Green
    
    # Open admin page in browser
    Write-Host "🌐 Opening admin page..." -ForegroundColor Yellow
    Start-Process "http://localhost:3000/admin"
    
    Write-Host "✅ Admin page opened!" -ForegroundColor Green
    Write-Host "📱 Admin URL: http://localhost:3000/admin" -ForegroundColor Cyan
    Write-Host "🏠 Home URL: http://localhost:3000" -ForegroundColor Cyan
} else {
    Write-Host "❌ Frontend is not running on port 3000" -ForegroundColor Red
    Write-Host "💡 Please start the frontend first with: yarn start" -ForegroundColor Yellow
} 