@echo off
title Micro-Frontend - All Servers
echo Starting all 3 servers...
echo.
echo   Shell     -^> http://localhost:4200
echo   Remote    -^> http://localhost:4201
echo   Equipment -^> http://localhost:4202
echo.
echo Close this window to stop all servers.
echo.

start "products (4201)" cmd /c "cd /d %~dp0products && npx ng serve --port 4201"
timeout /t 2 /nobreak >nul
start "equipment (4202)" cmd /c "cd /d %~dp0equipment && npx ng serve --port 4202"
timeout /t 2 /nobreak >nul
start "shell (4200)" cmd /c "cd /d %~dp0shell && npx ng serve --port 4200"
timeout /t 12 /nobreak >nul
start http://localhost:4200

echo.
echo All servers started. Keep this window open.
pause >nul
