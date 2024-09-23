@echo off



SET BRANCH_NAME_NEEDED=master
SET BRANCH_NAME=
FOR /f "delims=" %%a in ('git rev-parse --abbrev-ref HEAD') DO (SET "BRANCH_NAME=%%a")

if "%BRANCH_NAME%" == "%BRANCH_NAME_NEEDED%" (
    echo Current branch is %BRANCH_NAME%. Starting local server that uses PRODUCTION database.

    @REM Doesn't work with node.js 22, install 20.
    firebase "--config=firebase-production.json" "serve" "--project=production"
)
else(
    echo Current branch is %BRANCH_NAME%. Starting local server that uses DEVELOPMENT database.

    @REM Doesn't work with node.js 22, install 20.
    firebase "--config=firebase-development.json" "serve" "--project=development"
)
