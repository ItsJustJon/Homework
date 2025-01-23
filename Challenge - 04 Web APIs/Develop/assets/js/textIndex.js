console.log(testFormLabels());
// console.log(testError());


// const initializeHTML = () => {
//     const form = document.querySelector('form');
//     const usernameLabel = document.querySelector('label[for="username"]');
//     const usernameInput = document.querySelector('input[id="username"]');
//     const titleLabel = document.querySelector('label[for="title"]');
//     const titleInput = document.querySelector('input[id="title"]');
//     const contentLabel = document.querySelector('label[for="content"]');
//     const contentInput = document.querySelector('textarea[id="content"]');
//     const error = document.querySelector('#error');
  
//     return {
//       form,
//       usernameLabel,
//       usernameInput,
//       titleLabel,
//       titleInput,
//       contentLabel,
//       contentInput,
//       error,
//     };
//   };

// Test that the form exists and is labeled correctly
function testFormLabels() {
      if (
        form &&
        usernameLabel &&
        usernameInput &&
        titleLabel &&
        titleInput &&
        contentLabel &&
        contentInput
      ) {
        return {
          ok: true,
          passed: true,
          score: 5,
          feedback:
            'Great job! You have a form with labels and inputs for username, blog title, and blog content!',
          expand_feedback: true,
        };
      }
  
      if (
        form &&
        (!usernameLabel ||
          !usernameInput ||
          !titleLabel ||
          !titleInput ||
          !contentLabel ||
          !contentInput)
      ) {
        return {
          ok: true,
          passed: false,
          feedback:
            'The form does not have all of the required labels and inputs!',
          expand_feedback: true,
        };
      }
  
      return {
        ok: true,
        passed: false,
        feedback: 'You are missing the required form.',
        expand_feedback: true,
      };
}




















    