# Mock Anvil Script for Windows
# This script provides a basic mock of the anvil blockchain for development

Write-Host "🚀 Starting Mock Anvil Blockchain..." -ForegroundColor Green
Write-Host "This is a mock implementation for development purposes" -ForegroundColor Yellow
Write-Host "Listening on http://127.0.0.1:8545" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Red

# Keep the script running to simulate anvil
while ($true) {
    Start-Sleep -Seconds 1
} 