const loginForm = document.getElementById('loginForm');


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();



    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementById('adminRadio').checked;




    try {

        
        const response = await fetch('http://localhost:3000/api/login', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, isAdmin })



        });



        if (!response.ok) {
            throw new Error('Login failed');
        }



        const data = await response.json();
        



        localStorage.setItem('user', JSON.stringify({...data, isAdmin: isAdmin}));




        if (isAdmin) {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }



    } catch (error) {
        alert('Invalid email or password or role');
        console.error('Login error:', error);
    }





}); 