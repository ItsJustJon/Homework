// TODO: Create logic to toggle the light/dark mode styles for the page and circle. The mode should be saved to local storage.
// let toggleButton = document.querySelector('#toggle');
let toggleButton = document.getElementById('toggle');

toggleButton?.addEventListener('click', function() {
    toggleMode()
});

function toggleMode() {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
        document.documentElement.style.setProperty('--circle-color', 'white');
    } else {
        localStorage.setItem('mode', 'light');
        document.documentElement.style.setProperty('--circle-color', 'black');
    }
};

// TODO: Create a function called `readLocalStorage` that reads from local storage and returns the data. If no data exists, return an empty array.
function readLocalStorage() {
    const storedData = localStorage.getItem('blog');
    if (!storedData) {
        return [];
    }
    return JSON.parse(storedData);
}

// TODO: Create a function called `storeLocalStorage` that takes a given object and saves the new data to the existing blog data in local storage.
function storeLocalStorage(data) {
  localStorage.setItem('blog', JSON.stringify(data));
}

// ! Use the following function whenever you need to redirect to a different page
let redirectURL = 'blog.html';
const redirectPage = function (url) {
  redirectURL = url;
  location.assign(url);
};

