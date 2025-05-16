const registerForm = document.getElementById('registerForm');





registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();




    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementById('adminRadio').checked;





    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, isAdmin })
        });





        if (!response.ok) {
            throw new Error('Registration failed');
        }




        const data = await response.json();
        
        localStorage.setItem('user', JSON.stringify({...data, isAdmin: isAdmin}));





        if (isAdmin) {



            window.location.href = 'admin.html';



        } else {


            window.location.href = 'index.html';


        }


    } catch (error) {



        alert('Registration failed. Please try again.');
        console.error('Registration error:', error);



    }


    
}); 