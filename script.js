function showLoader() {
    document.getElementById("loginLoader").classList.add("active");
}

function hideLoader() {
    document.getElementById("loginLoader").classList.remove("active");
}


function register() {
    const baby_name = document.getElementById('baby_name').value;
    const baby_age = document.getElementById('baby_age').value;
    const baby_gender = document.getElementById('baby_gender').value;
    const baby_picture = document.getElementById('baby_picture');
    const baby_card = document.getElementById('baby_card');

    const b_pic = baby_picture.files[0];
    const b_card = baby_card.files[0];

    if (!b_pic || b_card) {
        hideLoader()
        return Swal.fire({
             title: "Upload Image",
            text: "Please upload an image",
            icon: "question",

        });
    } 

    showLoader()
    // Validate input (add your validation logic here)
    if (baby_name == "" || baby_age == "" || baby_gender == "" || baby_picture == "" || baby_card == "") {
        hideLoader()
        return Swal.fire({
            title: "Missing fields",
            text: "Input fields cannot be left blank",
            icon: "question",

        });
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'khday3qd');

    axios.post('https://api.cloudinary.com/v1_1/daf6mdwkh/image/upload', formData)
        .then(response => {




            // console.log(response.data.url)
            // Send registration request to the server using Axios
            axios.post('https://shalomserver.onrender.com/admin/create-plan', {
                name: name,
                targetinvestor: targetInvestor,
                targetcash: targetCash,
                targetmultiple: targetMultiple,
                photo: `${response.data.url}`
            })
                .then(response => {
                    console.log(response)

                    // Handle successful registration response

                    if (response.data['error'] == true) {
                        hideLoader()
                        return Swal.fire({
                            title: "Error",
                            text: response.data['message'],


                            icon: "error"
                        });
                    }

                    hideLoader()

                    return Swal.fire({
                        title: "Success",
                        text: 'Successful',


                        icon: "success"
                    });

                })
                .catch(error => {
                    hideLoader()
                    return Swal.fire({
                        title: "Error",
                        text: error,


                        icon: "error"
                    });



                })
                .finally(() => {
                    // Hide the loader when the request is complete (success or failure)
                    hideLoader()
                });
        })
        .catch(error => {
            hideLoader()
            return Swal.fire({
                title: "Error",
                text: error,


                icon: "error"
            });



        })
        .finally(() => {
            // Hide the loader when the request is complete (success or failure)

        });


    // Create data object to send in the request
    // const data = {
    //     firstname: firstname,
    //     lastname: lastname,
    //     email: email,
    //     phonenumber: phonenumber,
    //     password: password

    // };

    // Send registration request to the server using Axios
    // axios.post('https://shalomserver.onrender.com/auth/register', data)
    //     .then(response => {


    //         // Handle successful registration response
    //         console.log(response);
    //         if (response.data['error'] == true) {
    //             hideLoader()

    //             return Swal.fire({
    //                 title: "Error",
    //                 text: response.data['message'],


    //                 icon: "error"
    //             });
    //         }
    //         // Optionally redirect to another page
    //         Swal.fire({
    //             title: "Success",
    //             text: "Registered",
    //             icon: "success"
    //         });
    //         hideLoader()
    //         setTimeout(function () {
    //             window.location.pathname = "/login.html";
    //         }, 2000);

    //     })
    //     .catch(error => {


    //         // Handle errors
    //         console.error('Error:', error);
    //     })
    //     .finally(() => {
    //         // Hide the loader when the request is complete (success or failure)

    //     });
}
