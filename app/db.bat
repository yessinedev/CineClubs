@echo off
setlocal

if "%1"=="" (
    echo Available commands:
    echo   seed         Seed the database
    echo   seed:force   Force reseed the database
    echo   help         Show this help message
    exit /b 1
)

set COMMAND=--help
if "%1"=="seed" (
    set COMMAND=--seed
)
if "%1"=="seed:force" (
    set COMMAND=--seed --force
)
if "%1"=="help" (
    set COMMAND=--help
)

call mvnw compile exec:java ^
    -Dexec.mainClass="com.cineclubs.app.cli.DatabaseSeederMain" ^
    -Dexec.args="%COMMAND%" ^
    -Dspring.profiles.active=seed

endlocal