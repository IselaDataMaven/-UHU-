@echo off
cd /d "%~dp0"
echo ========================================
echo   NUHU Resonance
echo ========================================
where node >nul 2>nul
if errorlevel 1 (
  echo Instala Node.js: https://nodejs.org
  pause
  exit /b 1
)
if not exist node_modules (
  echo Ejecutando npm install...
  call npm install
)
echo.
echo Abre: http://localhost:3000
start http://localhost:3000
node server.js
pause
