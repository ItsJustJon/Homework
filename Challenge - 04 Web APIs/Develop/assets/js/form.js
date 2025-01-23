// TODO: Create a variable that selects the form element
const form = document.querySelector('form');
// const usernameLabel = document.querySelector('label[for="username"]');
// const usernameInput = document.querySelector('input[id="username"]');
// const titleLabel = document.querySelector('label[for="title"]');
// const titleInput = document.querySelector('input[id="title"]');
// const contentLabel = document.querySelector('label[for="content"]');
// const contentInput = document.querySelector('textarea[id="content"]');
// const errorMessage = document.querySelector('#error');
// const submitButton = document.querySelector('button[id="submit"]');


// TODO: Create a function that handles the form submission. Grab the form data and store it in local storage, then redirect to the blog page using the `redirectPage` function. If the form is submitted with missing data, display an error message to the user.
// TODO: Add an event listener to the form on submit. Call the function to handle the form submission.
document.getElementById("submit").addEventListener("click",function(){
    console.log("Submit clicked")
    const username = document.getElementById("username").value;
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const errorMessage = document.getElementById("error");
    if (!username || !title || !content) {
        alert('Please fill out all fields before submitting!');
        errorMessage.textContent = 'Please complete the form.';
        return;
    }
    const storedData = readLocalStorage();
    storedData.push({ "username": username, "title": title, "content": content});
    localStorage.setItem('blog', JSON.stringify(storedData));
    storeLocalStorage(storedData);
    redirectURL = 'blog.html';
    window.location.href = 'blog.html';
}); 

document.getElementById("submit").addEventListener("submit",function(){
    console.log("Submit submitted")
    const username = document.getElementById("username").value;
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const errorMessage = document.getElementById("error");
    if (!username || !title || !content) {
        alert('Please fill out all fields before submitting!');
        errorMessage.textContent = 'Please complete the form.';
        return;
    }
    const storedData = readLocalStorage();
    storedData.push({ "username": username, "title": title, "content": content});
    localStorage.setItem('blog', JSON.stringify(storedData));
    storeLocalStorage(storedData);
    redirectURL = 'blog.html';
    window.location.href = 'blog.html';
}); 

initializeForm();
function initializeForm() {
    const storedData = readLocalStorage();
    if (!storedData || storedData.length === 0) {
        storedData.push({ "username": "test", "title": "test", "content": "test"});
        localStorage.setItem('blog', JSON.stringify(storedData));
        storeLocalStorage(storedData);
    }
}