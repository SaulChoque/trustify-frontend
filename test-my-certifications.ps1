# Test My Certifications Page Script
# This script opens the my-certifications page in the browser

Write-Host "🧪 Testing My Certifications Page..." -ForegroundColor Green

# Check if frontend is running
$frontendRunning = netstat -an | findstr ":3000" | findstr "LISTENING"
if ($frontendRunning) {
    Write-Host "✅ Frontend is running on port 3000" -ForegroundColor Green
    
    # Open my-certifications page in browser
    Write-Host "🌐 Opening my-certifications page..." -ForegroundColor Yellow
    Start-Process "http://localhost:3000/my-certifications"
    
    Write-Host "✅ My Certifications page opened!" -ForegroundColor Green
    Write-Host "📱 My Certifications URL: http://localhost:3000/my-certifications" -ForegroundColor Cyan
    Write-Host "🏠 Home URL: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "👨‍💼 Admin URL: http://localhost:3000/admin" -ForegroundColor Cyan
    Write-Host "🛡️ Authorizer URL: http://localhost:3000/authorizer" -ForegroundColor Cyan
} else {
    Write-Host "❌ Frontend is not running on port 3000" -ForegroundColor Red
    Write-Host "💡 Please start the frontend with: yarn start" -ForegroundColor Yellow
} 