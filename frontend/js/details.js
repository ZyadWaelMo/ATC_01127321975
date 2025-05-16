

let eventImg = document.getElementById('eventImage'),  


    title = document.getElementById('eventName'),
    desc = document.getElementById('eventDescription'),
    cat = document.getElementById('eventCategory'),
    date = document.getElementById('eventDate'),
    venue = document.getElementById('eventVenue'),
    price = document.getElementById('eventPrice'),



    bookBtn = document.getElementById('bookNowBtn'),
    booked = document.getElementById('bookedMessage');





const loginBtn = document.getElementById('loginLink'),
    regBtn = document.getElementById('registerLink'),
    userDisplay = document.getElementById('username'),
    logoutBtn = document.getElementById('logoutLink'),


    nameDisplay = document.getElementById('user');







let eventId = new URLSearchParams(window.location.search).get('id');



let user = JSON.parse(localStorage.getItem('user') || '{}');




const showHide = (elem, show) => elem.style.display = show ? 'block' : 'none';



if (user.id) {

    showHide(loginBtn, false);

    showHide(regBtn, false);

    showHide(userDisplay, true);

    showHide(logoutBtn, true);

    nameDisplay.textContent = user.name;

} else {


    window.location.href = 'login.html';

}






logoutBtn.addEventListener('click', e => {

    e.preventDefault();

    localStorage.removeItem('user');  

    window.location.href = 'index.html';  

});



const isBooked = eventId => {

    return user.bookings?.includes(eventId) || false;
}












async function loadEventDetails() {



    try {
        let response = await fetch(`http://localhost:3000/api/events/${eventId}`);
        let event = await response.json();


        eventImg.src = event.imageUrl;
        title.textContent = event.name;
        desc.textContent = event.description;
        cat.textContent = event.category;



        let eventDate = new Date(event.date);
        date.textContent = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });



        venue.textContent = event.venue;
        price.textContent = event.price;



        if (isBooked(eventId)) {
            showHide(bookBtn, false);
            showHide(booked, true);
        }

    } catch (err) {
        console.error('Failed to load event:', err);
    }







}












bookBtn.addEventListener('click', async () => {


    try {



        let response = await fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                eventId: eventId



            })



        });

        if (!response.ok) {
            throw new Error('Booking failed - server said no!');
        }




        let updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));




        window.location.href = 'congratulations.html';



    } catch (err) {
        alert('Sorry, booking failed! Please try again.');
        console.error('Booking error:', err);




    }



});











loadEventDetails(); 