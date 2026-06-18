     // To-Do List

function addTask(){

    let input = document.getElementById("taskInput");
    let task = input.value;

    if(task === ""){
        alert("Please enter a task");
        return;
    }


    let li = document.createElement("li");

    li.innerHTML = task + 
    " <button onclick='this.parentElement.remove()'>Delete</button>";

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}



// Contact Form Validation

document.getElementById("contactForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let message = document.getElementById("message").value;

    let result = document.getElementById("result");


    if(name === "" || email === "" || 
       mobile === "" || message === ""){

        result.innerHTML = 
        "Please fill all fields";
    }

    else if(!email.includes("@")){

        result.innerHTML =
        "Enter valid email";
    }

    else if(mobile.length != 10){

        result.innerHTML =
        "Mobile number should be 10 digits";
    }

    else{

        result.innerHTML =
        "Form submitted successfully!";
    }

});
