# Start Project Script for Trustify Frontend
# This script starts the entire project with mock blockchain

Write-Host "🚀 Starting Trustify Frontend Project..." -ForegroundColor Green

# Check if yarn is installed
try {
    $yarnVersion = yarn --version
    Write-Host "✅ Yarn version: $yarnVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Yarn is not installed. Please install Yarn first." -ForegroundColor Red
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    yarn install
}

# Deploy mock contracts
Write-Host "📝 Deploying mock contracts..." -ForegroundColor Yellow
yarn deploy

# Start the frontend in the background
Write-Host "🌐 Starting frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "yarn start"

# Wait a moment for the frontend to start
Start-Sleep -Seconds 3

# Open the browser
Write-Host "🌍 Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"

Write-Host "✅ Project started successfully!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Debug: http://localhost:3000/debug" -ForegroundColor Cyan
Write-Host "📊 Block Explorer: http://localhost:3000/blockexplorer" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to stop the project..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 