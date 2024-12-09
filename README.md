# TuniClubs - Social Media Platform

a dynamic platform connecting people through diverse clubs and shared interests.
---

## 🚀 Project Overview

This platform fosters a vibrant community for diverse clubs, offering a space to connect with like-minded individuals. Users can join clubs, participate in discussions, and stay updated on club activities.

---

## ✨ Core Features

### **Club Management**

- Create, update, and delete clubs.
- Configure clubs as **public** (open to all) or **private** (invite-only).
- Detailed club profiles include:
  - Club name.
  - Description.
  - Banner image.

---
### **Club Discussions**

- Create **discussion threads** within a club.
- Enable **replies** to threads for detailed conversations.
- Club Members Chat messages

---
### **User Pofile**
- Profile Picture.
- Banner
- Change Password.
- Joined Clubs.
- Threads Posts.
- Posts Liked.

---

### **Club Moderation**

- Club owners or moderators have tools to:
  - **Remove members** who violate club rules.
  - **Delete inappropriate posts or threads**.
  - **Invite new members** to private clubs.

---
## ✨ Upcoming Features
---
### **Member Activity Tracking**

- Track active members and their contributions:
  - Threads started.
  - Posts made.
- Display a  **leaderboard** of the most active members & clubs.

---

### **Notifications**

- Notify members about:
  - New threads in clubs they've joined.
  - Invitations to join private clubs.

---

## 🛠️ Technologies Used

- **Frontend**: React, Tailwind CSS, React Router.
- **Backend**: SpringBoot, PostgreSQL, WebSocket.
- **Authentication**: Clerk for user management.
- **API Management**: React Query for efficient state handling.

---
## 💾 Database Seeding

Populate the database with sample data for development:

```bash
# Windows
.\db.bat seed        # Seed database
.\db.bat seed:force  # Force reseed (adds more data)

# Linux/macOS
./db.sh seed        # Seed database
./db.sh seed:force  # Force reseed (adds more data)
```

Creates sample users, clubs, posts... for testing.
