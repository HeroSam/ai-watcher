@echo off
title AI Watcher Setup
echo ========================================
echo     AI Watcher - Automatic Setup
echo ========================================
echo.

:: ----- 1. التحقق من وجود Node.js في النظام -----
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ Node.js is already installed.
    echo.
    goto :install_deps
)

:: ----- 2. تنزيل Node.js إذا لم يكن موجوداً -----
echo ⚠️ Node.js not found. Downloading...
echo.

:: تحديد مسار المجلد الحالي
set "ROOT_DIR=%~dp0"
set "NODE_DIR=%ROOT_DIR%node-v24.17.0-win-x64"
set "NODE_ZIP=%ROOT_DIR%node-v24.17.0-win-x64.zip"

:: تحميل الملف
powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v24.17.0/node-v24.17.0-win-x64.zip' -OutFile '%NODE_ZIP%'"
if %errorlevel% neq 0 (
    echo ❌ Failed to download Node.js. Please check your internet connection.
    pause
    exit /b
)
echo ✅ Download complete.

:: ----- 3. فك ضغط الملف -----
echo 📦 Extracting...
powershell -Command "Expand-Archive -Path '%NODE_ZIP%' -DestinationPath '%ROOT_DIR%' -Force"
if %errorlevel% neq 0 (
    echo ❌ Failed to extract the archive.
    pause
    exit /b
)
echo ✅ Extraction complete.

:: حذف ملف ZIP لتوفير المساحة
del "%NODE_ZIP%" 2>nul

:: ----- 4. إضافة Node.js إلى PATH المؤقت -----
set "PATH=%NODE_DIR%;%PATH%"

:: ----- 5. تثبيت الاعتماديات وتشغيل المشروع -----
:install_deps
echo.
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies.
    pause
    exit /b
)

echo.
echo 🚀 Starting the application...
echo ========================================
echo.

:: تشغيل المشروع
node index.js

:: لو حصل خطأ في التشغيل
if %errorlevel% neq 0 (
    echo.
    echo ❌ Application crashed with error code %errorlevel%.
    pause
)

:: في حالة إغلاق البرنامج بشكل طبيعي
pause