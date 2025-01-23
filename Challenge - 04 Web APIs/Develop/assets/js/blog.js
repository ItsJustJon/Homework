// TODO: Create a variable that selects the main element, and a variable that selects the back button element
let mainElement = document.querySelector('main');
let backButton = document.querySelector('#back');


// TODO: Create a function that builds an element and appends it to the DOM
function buildElement(tag, text, className) {
  let element = document.createElement(tag);
  element.textContent = text;
  element.className = className;
  mainElement.appendChild(element);
}

// TODO: Create a function that handles the case where there are no blog posts to display
function noPosts() {
  buildElement('h3', 'No Blog posts yet...', 'no-posts');
}

// TODO: Call the `renderBlogList` function
renderBlogList();

// TODO: Create a function called `renderBlogList` that renders the list of blog posts if they exist. If not, call the no posts function.
function renderBlogList() {
  let posts = JSON.parse(localStorage.getItem('blog'));
  if (!posts) {
        noPosts();
  } else {
        for (let i = 0; i < posts.length; i++) {
            buildElement('h2', posts[i].username, 'username');
            buildElement('h4', posts[i].title, 'title');
            buildElement('p', posts[i].content, 'content');
        }
        // posts.forEach(post => {
        // buildElement('h2', post.username, 'username');
        // buildElement('h4', post.title, 'title');
        // buildElement('p', post.content, 'content');
    };
  }



// TODO: Redirect to the home page using the `redirectPage` function found in logic.js when the back button is clicked
backButton.addEventListener('click', function() {
    redirectPage("index.html")
});
