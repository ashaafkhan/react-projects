# Authentication App

Live demo: https://authentication-zeta-six.vercel.app/

## Overview
A simple authentication UI that connects to the FreeAPI auth endpoints. It supports user registration, login, logout, and viewing the current authenticated user with clear success/error feedback and loading states.

## Features
- Register new users
- Log in and store session token
- Fetch current user details
- Log out and clear session
- Toast messages for success and errors

## API Endpoints
- POST https://api.freeapi.app/api/v1/users/register
- POST https://api.freeapi.app/api/v1/users/login
- POST https://api.freeapi.app/api/v1/users/logout
- GET https://api.freeapi.app/api/v1/users/current-user

## Tech Stack
- HTML
- Tailwind CSS (CDN)
- Vanilla JavaScript

## Run Locally
Open index.html in your browser, or use Live Server from VS Code.