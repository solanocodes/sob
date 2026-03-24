@echo off
echo ═══════════════════════════════════════
echo   SHAPE OF BLACKS — Push Patch
echo ═══════════════════════════════════════
echo.

:: Get the version from package.json
for /f "tokens=2 delims=:, " %%a in ('findstr "version" package.json') do set VER=%%~a
echo Current version: %VER%
echo.

:: Stage all changes
git add .

:: Commit with version
set /p MSG="Commit message (or press Enter for default): "
if "%MSG%"=="" set MSG=Patch %VER%
git commit -m "%MSG%"

:: Push to main
git push origin main

echo.
echo ═══════════════════════════════════════
echo   PUSHED! GitHub is now building v%VER%
echo   Check: https://github.com/YOUR_ORG/shape-of-blacks/actions
echo   EXE will appear in Releases in ~3 minutes
echo ═══════════════════════════════════════
pause
