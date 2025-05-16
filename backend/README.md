<!-- The Backend -->

<!-- Setup Instructions -->

1 - Make sure you have Node.js installed

2 - Navigate to the backend directory

3 - open cmd in the backend directory

4 - Install dependencies:

   npm install

5 - Start the server:

   npm start

   The server will run at http://localhost:3000



<!-- API Endpoints -->

<!-- Authentication -->
- POST `/api/login` - User login
- POST `/api/register` - User registration

<!-- Events -->
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get single event
- POST `/api/events` - Create new event (admin only)
- DELETE `/api/events/:id` - Delete event (admin only)

<!-- Bookings -->
- POST `/api/bookings` - Book an event

<!-- Data Storage -->

The application uses JSON files to store data:
- `users.json` - User accounts and bookings
- `events.json` - Event information


<!-- Features -->

- User authentication
- Event management
- Booking management
- JSON file-based data storage

built with Node.js, Express.js, UUID for generating IDs, CORS for cross-origin requests 


