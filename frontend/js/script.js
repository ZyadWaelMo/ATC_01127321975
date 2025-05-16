const user = localStorage.getItem('user');
const loginLink = document.getElementById('one');
const registerLink = document.getElementById('two');
const usernameElement = document.getElementById('username');
const userLink = document.getElementById('user');
const logoutLink = document.getElementById('logout');

// const bookingsLink = document.getElementById('bookings');






if (user) {



    const userData = JSON.parse(user);


    loginLink.style.display = 'none';
    registerLink.style.display = 'none';

    usernameElement.style.display = 'block';


    userLink.textContent = userData.name;

    logoutLink.style.display = 'block';
    // bookingsLink.style.display = 'block';



    if (userData.isAdmin) {
        const adminLink = document.createElement('li');


        adminLink.className = 'nav-item ms-4';
        adminLink.innerHTML = '<a href="admin.html" class="nav-link text-light backA">Admin Panel</a>';


        document.querySelector('.navbar-nav').appendChild(adminLink);
    }
}
else {
    usernameElement.style.display = 'none';
    logoutLink.style.display = 'none';

    // bookingsLink.style.display = 'none';

}







logoutLink.addEventListener('click', (e) => {
    e.preventDefault();



    localStorage.removeItem('user');
    window.location.href = 'index.html';


});






async function fetchEvents() {
    try {
        const response = await fetch('http://localhost:3000/api/events');
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}




function displayEvents(events) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';



    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '300px';




        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const hasBooked = user.bookings ? user.bookings.includes(event.id) : false;




        card.innerHTML = `
            <img class="card-img-top" src="${event.imageUrl}" alt="Event image" style="height: 200px; object-fit: cover;">
            <div class="card-body text-center">
                <h4 class="card-title">${event.name}</h4>
                <a href="details.html?id=${event.id}" class="btn btn-gradient">View Details</a>
                ${hasBooked ?
                '<button class="btn btn-secondary mt-2" disabled>Booked</button>' :
                `<a href="details.html?id=${event.id}" class="btn btn-gradient mt-2">Book Now</a>`
            }
            </div>
        `;







        cardsContainer.appendChild(card);

        
    });
}







fetchEvents(); 