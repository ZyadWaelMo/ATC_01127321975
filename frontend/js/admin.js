

const user = JSON.parse(localStorage.getItem('user') || '{}');



if (!user.isAdmin) {
    window.location.href = 'index.html';
}





document.getElementById('adminName').textContent = user.name;



document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();


    localStorage.removeItem('user');


    window.location.href = 'index.html';


});






const addEventForm = document.getElementById('addEventForm');
const editEventForm = document.getElementById('editEventForm');





addEventForm.addEventListener('submit', async (e) => {
    e.preventDefault();



    const eventData = {


        name: document.getElementById('name').value.trim(),


        category: document.getElementById('category').value.trim(),
        description: document.getElementById('description').value.trim(),
        date: document.getElementById('date').value,
        venue: document.getElementById('venue').value.trim(),
        price: parseFloat(document.getElementById('price').value),


        imageUrl: document.getElementById('imageUrl').value.trim()


    };



    try {

        const response = await fetch('http://localhost:3000/api/events', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)


        });


        if (!response.ok) {
            throw new Error('Failed to add event');
        }



        alert('Event added successfully!');
        addEventForm.reset();
        fetchEvents();



    } catch (error) {
        alert('Failed to add event. Please try again.');
        console.error('Add event error:', error);
    }






});


async function fetchEvents() {





    try {


        const response = await fetch('http://localhost:3000/api/events');
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }



        const events = await response.json();
        displayEvents(events);



    } catch (error) {
        console.error('Error fetching events:', error);
    }




}






function displayEvents(events) {




    const tableBody = document.getElementById('eventsTableBody');
    tableBody.innerHTML = '';

    events.forEach(event => {
        const row = document.createElement('tr');



        row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.category}</td>
            <td>${new Date(event.date).toLocaleDateString()}</td>
            <td>${event.venue}</td>
            <td>$${event.price}</td>
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="openEditModal('${event.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteEvent('${event.id}')">Delete</button>
            </td>
        `;






        tableBody.appendChild(row);
    });





}




async function deleteEvent(eventId) {


    if (!confirm('Are you sure you want to delete this event?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {


            method: 'DELETE'

        });



        if (!response.ok) {

            throw new Error('Failed to delete event');
        }



        alert('Event deleted successfully!');

        fetchEvents();



        
    } catch (error) {

        alert('Failed to delete event. Please try again.');

        console.error('Delete event error:', error);
    }
}



async function openEditModal(eventId) {

    if (!eventId) {

        console.error('No event ID provided');
        return;
    }

    try {

        console.log('Fetching event details for ID:', eventId);


        const response = await fetch(`http://localhost:3000/api/events/${eventId}`);


        
        
        
        if (!response.ok) {
        
            const errorText = await response.text();
            console.error('Error response:', errorText);
        
        
            throw new Error('Failed to fetch event details');
        
        
        }

        
        
        
        const event = await response.json();
        
        
        console.log('Fetched event details:', event);


        document.getElementById('editEventId').value = event.id;
        document.getElementById('editName').value = event.name;
        document.getElementById('editCategory').value = event.category;
        document.getElementById('editDescription').value = event.description;
        
        
        document.getElementById('editDate').value = event.date.split('T')[0];
        document.getElementById('editVenue').value = event.venue;
        
        document.getElementById('editPrice').value = event.price;
        document.getElementById('editImageUrl').value = event.imageUrl;




        
        const editModal = new bootstrap.Modal(document.getElementById('editEventModal'));
        
        
        editModal.show();


    } catch (error) {
        console.error('Error fetching event details:', error);
        
        alert('Failed to load event details. Please try again.');
    
    
    }
}






async function updateEvent() {


    const eventId = document.getElementById('editEventId').value;

    
    
    if (!eventId) {
    
    
        console.error('Event ID is missing');
        alert('Event ID is missing');
    
    
        return;
    }





    
    console.log('Updating event with ID:', eventId);

    
    
    
    const eventData = {
    
    
    
        name: document.getElementById('editName').value.trim(),
    
    
        category: document.getElementById('editCategory').value.trim(),
    
    
        description: document.getElementById('editDescription').value.trim(),
        date: document.getElementById('editDate').value,
        venue: document.getElementById('editVenue').value.trim(),
    
        price: parseFloat(document.getElementById('editPrice').value),
    
        imageUrl: document.getElementById('editImageUrl').value.trim()
    
    
    
    
    
    
    
    };



    
    console.log('Update data:', eventData);


    try {

        const url = `http://localhost:3000/api/events/${eventId}`;
        console.log('Making PUT request to:', url);


        const response = await fetch(url, {


            method: 'PUT',
            headers: {


                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)

        });





        console.log('Response status:', response.status);


        const responseText = await response.text();
        console.log('Response text:', responseText);




        if (!response.ok) {


            throw new Error(responseText || 'Failed to update event');
        }



        const updatedEvent = responseText ? JSON.parse(responseText) : null;


        console.log('Successfully updated event:', updatedEvent);



        const editModal = bootstrap.Modal.getInstance(document.getElementById('editEventModal'));


        editModal.hide();



        alert('Event updated successfully!');

        fetchEvents();




    } catch (error) {
        console.error('Update event error:', error);
        alert(`Failed to update event: ${error.message}`);
    }







}










fetchEvents(); 