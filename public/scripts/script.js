// Nav

console.log("hi")

const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
// searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

// searchBtn.addEventListener("click" , () =>{
//     sidebar.classList.remove("close");
// })

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});


// Form

const commentsForm = document.getElementById("comments-form");
const commentsSection = document.getElementById("comments-section")
const closeBtn = document.getElementById("closeBtn");
const popup = document.getElementById("popup");

// Event listener for opening the popup

commentsForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    const username = commentsForm.elements["username"].value;
    const comment = commentsForm.elements["comment"].value; 
    const body = {
        username,
        comment,
    }

    // Recencies

    fetch("/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    }).then(function(response) {
        // popup.classList.add("open");
        return response.json();
    }).then(function(data) {
        const comments = data.data
        console.log(comments);

        // Clear previous comments (if any)
        commentsSection.innerHTML = '';

        // Loop through the comments array and create HTML elements to display them
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            const usernameElement = document.createElement("p");
            usernameElement.classList.add("comment-username");
            usernameElement.textContent = comment.username + ":";

            const commentTextElement = document.createElement("p");
            commentTextElement.textContent = comment.comment;

            // Append username and comment text to the comment element
            commentElement.appendChild(usernameElement);
            commentElement.appendChild(commentTextElement);

            // Append the comment element to the comments section
            commentsSection.appendChild(commentElement);
        });
    })
});



// // Event listener for closing the popup

// closeBtn.addEventListener("click", () =>{
//     popup.classList.remove("open");
// });



function addToLeeslijst(id) {

    // Maak een HTTP-verzoek naar je server om het boek toe te voegen aan de leeslijst
    fetch('/add-to-leeslijst', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId: id }) // Verzend het boek-ID naar de server
    })
    .catch(error => console.error('Er is een fout opgetreden:', error));
}