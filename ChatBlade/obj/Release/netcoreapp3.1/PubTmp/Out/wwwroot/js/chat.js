"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var h5 = document.createElement("h5"); //was li
    document.getElementById("messagesList").appendChild(h5);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    h5.textContent = `${user} says: ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});
//get user name by prompt
let user = prompt("Enter your name");
/*
if (user === null) {
    window.location.reload();
}
*/

document.getElementById("sendButton").addEventListener("click", function (event) {
    
     //var user = document.getElementById("userInput").value;
    //let user = prompt("enter your name");
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});