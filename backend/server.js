

const express = require('express');
const cors = require('cors');

const fs = require('fs');
const { v4: uuid } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');



function readJSON(filePath) {



    return JSON.parse(fs.readFileSync(filePath, 'utf8'));


}

function writeJSON(filePath, data) {


    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));


}




app.post('/api/login', (req, res) => {



    let { email, password, isAdmin } = req.body;


    let { users } = readJSON(USERS_FILE);

    let user = users.find(u => 
        u.email === email && 
        u.password === password && 
        u.isAdmin === isAdmin
    );




    if (!user) {


        return res.status(401).json({ 


            error: 'Wrong email/password or account type!' 


        });
    }







    let { password: _, ...safeUser } = user;
    res.json(safeUser);




});






app.post('/api/register', (req, res) => {



    let { name, email, password, isAdmin } = req.body;
    let data = readJSON(USERS_FILE);

    if (data.users.some(u => u.email === email)) {
        return res.status(400).json({ 
            error: 'Email already taken!' 
        });



    }




    let newUser = {
        id: uuid(),
        name,
        email,
        password,
        isAdmin,
        bookings: []




    };



    data.users.push(newUser);


    writeJSON(USERS_FILE, data);

    let { password: _, ...safeUser } = newUser;


    res.status(201).json(safeUser);




});







app.get('/api/events', (req, res) => {


    try {

        let { events } = readJSON(EVENTS_FILE);


        res.json(events);

    } catch (err) {

        console.error('Failed to read events:', err);
        res.status(500).json({ error: 'Server hiccup!' });

    }






});




app.get('/api/events/:id', (req, res) => {





    try {
        let { events } = readJSON(EVENTS_FILE);
        let event = events.find(e => String(e.id) === String(req.params.id));
        

        if (!event) {
            return res.status(404).json({ error: 'Event not found!' });
        }
        
        res.json(event);



    } catch (err) {
        console.error('Failed to get event:', err);
        res.status(500).json({ error: 'Server error :(' });
    }






});





app.post('/api/events', (req, res) => {




    try {
        let { name, category, description, date, venue, price, imageUrl } = req.body;
        
        if (!name || !category || !description || !date || !venue || !price || !imageUrl) {
            return res.status(400).json({ error: 'Missing some event details!' });
        }




        let data = readJSON(EVENTS_FILE);
        let newEvent = {
            id: uuid(),
            name,
            category,
            description,
            date,
            venue,
            price: parseFloat(price),
            imageUrl




        };

        data.events.push(newEvent);
        writeJSON(EVENTS_FILE, data);
        res.status(201).json(newEvent);


    } catch (err) {


        console.error('Failed to create event:', err);
        res.status(500).json({ error: 'Could not create event :(' });


    }





});






app.put('/api/events/:id', (req, res) => {



    try {

        let eventId = String(req.params.id);

        let { name, category, description, date, venue, price, imageUrl } = req.body;



        if (!name || !category || !description || !date || !venue || !price || !imageUrl) {

            return res.status(400).json({ error: 'Missing required fields!' });

        }











        let data = readJSON(EVENTS_FILE);


        let index = data.events.findIndex(e => String(e.id) === eventId);



        if (index === -1) {
            return res.status(404).json({ error: 'Event not found!' });
        }




        let updatedEvent = {
            id: eventId,
            name,
            category,
            description,
            date,
            venue,
            price: parseFloat(price),
            imageUrl




        };





        data.events[index] = updatedEvent;
        writeJSON(EVENTS_FILE, data);
        res.json(updatedEvent);



    } catch (err) {

        console.error('Update failed:', err);
        res.status(500).json({ error: 'Update failed :(' });



    }




});










app.delete('/api/events/:id', (req, res) => {


    try {


        let data = readJSON(EVENTS_FILE);
        let index = data.events.findIndex(e => String(e.id) === String(req.params.id));



        if (index === -1) {

            return res.status(404).json({ error: 'Event not found!' });

        }





        data.events.splice(index, 1);

        writeJSON(EVENTS_FILE, data);

        res.status(204).send();




    } catch (err) {


        console.error('Delete failed:', err);


        res.status(500).json({ error: 'Could not delete event :(' });




    }
});







app.post('/api/bookings', (req, res) => {




    try {


        let { userId, eventId } = req.body;
        


        let userData = readJSON(USERS_FILE);

        let eventData = readJSON(EVENTS_FILE);




        let user = userData.users.find(u => u.id === userId);

        let event = eventData.events.find(e => e.id === eventId);





        if (!user || !event) {


            return res.status(404).json({ error: 'User or event not found!' });
        }



        if (user.bookings.includes(eventId)) {

            return res.status(400).json({ error: 'Already booked this event!' });

        }

        user.bookings.push(eventId);

        writeJSON(USERS_FILE, userData);

        let { password: _, ...safeUser } = user;

        res.json(safeUser);

    } catch (err) {

        console.error('Booking failed:', err);

        res.status(500).json({ error: 'Booking failed :(' });

    }


});











app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 