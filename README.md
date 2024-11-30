# Candidate Search Application

## Deescription
The **Candidate Search Application** is a web-based tool that allows users to review potential candidates fetched from the GitHub API. Users can view candidate details such as their usernames, avatar, email, location, and company (But only if they are available). The app also provides functionality to save candidates to a list for future reference.

---

## Features
-**Candidate Browsing**: Browse through candidates from GitHub.
-**Candidate Details**: View information such as username, avatar, email, location, and company.
- **Save Candidates**: Add candidates to a saved list for later review.
- **Dynamic Loading**: Automatically loads the next candidate after accepting or skipping.
- **Persisted Data**: Saved candidates are stored locally for future sessions.

---

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
2. npm install
3. Add your GitHub token to a .env file.
4. npm run dev

## How To Use

1. Browse candidates
2. View candidate details
3. Save candidates
4. Access saved candidates


## Technologies Used

Frontend: React, TypeScript
API: GitHub REST API
State Management: React Hooks (useState, useEffect)
Deployment: Render