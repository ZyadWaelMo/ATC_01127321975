A full-stack event booking system for Areeb Technology Internship Competition
 

# Setup Instructions - frontend

1 - Make sure you have the backend server running (see backend README)

2 - Open ( index.html ) and browse the website

# Setup Instructions - backend

1 - Make sure you have Node.js installed

2 - Navigate to the backend directory

3 - open cmd in the backend directory

4 - Install dependencies:

  - npm install

5 - Start the server:

  - npm start

   The server will run at http://localhost:3000

#####################################################


Default Admin Account

- Email: zyadwaelmo@gmail.com

- Password: zyad123

#####################################################


# Features - frontend

- User authentication (login/register)
- Browse events
- View event details
- Book events
- Admin panel for event management

HTML Pages 


- index.html - Home page with event listings

- login.html - User login page

- register.html - User registration page

- details.html - Event details page

- congratulations.html - Booking confirmation page

- admin.html - Admin panel for event management




built with HTML, CSS, Bootstrap, and JavaScript


# Features - backend

- User authentication
- Event management
- Booking management
- JSON file-based data storage


API Endpoints

Authentication 
- POST `/api/login` - User login
- POST `/api/register` - User registration

 Events 
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get single event
- POST `/api/events` - Create new event (admin only)
- DELETE `/api/events/:id` - Delete event (admin only)

Bookings 
- POST `/api/bookings` - Book an event

 Data Storage

The application uses JSON files to store data:
- `users.json` - User accounts and bookings
- `events.json` - Event information


built with Node.js, Express.js, UUID for generating IDs, CORS for cross-origin requests 



