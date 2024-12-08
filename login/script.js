 
        // Array with valid email-password combinations
        const validUsers = [
            { email: "client1@example.com", password: "password1" },
            { email: "client2@example.com", password: "password2" }
        ];

        // Form submission handler
        // document.getElementById('loginForm').addEventListener('submit', function(event) {
        //     event.preventDefault(); // Prevent form from submitting
            
        //     const email = document.getElementById('email').value;
        //     const password = document.getElementById('password').value;
        //     const errorMessage = document.getElementById('error-message');

        //     // Check if email and password match any in the array
        //     const isValidUser = validUsers.some(user => user.email === email && user.password === password);

        //     if (isValidUser) {
        //         errorMessage.style.display = 'none'; // Hide error message
        //         alert('Login successful!'); // You can redirect or take other actions here
        //     } else {
        //         errorMessage.style.display = 'block'; // Show error message
        //         errorMessage.textContent = 'Invalid email or password. Please try again.';
        //     }
        
    document.getElementById('contact-us-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this); // Create a FormData object from the form

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('formMessage').innerText = 'Thank you for your submission!';
                this.reset(); // Reset the form
            } else {
                document.getElementById('formMessage').innerText = 'There was a problem with your submission.';
            }
        })
        .catch(error => {
            document.getElementById('formMessage').innerText = 'There was a problem with your submission.';
        });
    });

   