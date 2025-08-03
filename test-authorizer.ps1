# Test Authorizer Page Script
# This script opens the authorizer page in the browser

Write-Host "🧪 Testing Authorizer Page..." -ForegroundColor Green

# Check if frontend is running
$frontendRunning = netstat -an | findstr ":3000" | findstr "LISTENING"
if ($frontendRunning) {
    Write-Host "✅ Frontend is running on port 3000" -ForegroundColor Green
    
    # Open authorizer page in browser
    Write-Host "🌐 Opening authorizer page..." -ForegroundColor Yellow
    Start-Process "http://localhost:3000/authorizer"
    
    Write-Host "✅ Authorizer page opened!" -ForegroundColor Green
    Write-Host "📱 Authorizer URL: http://localhost:3000/authorizer" -ForegroundColor Cyan
    Write-Host "🏠 Home URL: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "👨‍💼 Admin URL: http://localhost:3000/admin" -ForegroundColor Cyan
} else {
    Write-Host "❌ Frontend is not running on port 3000" -ForegroundColor Red
    Write-Host "💡 Please start the frontend with: yarn start" -ForegroundColor Yellow
} 