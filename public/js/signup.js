$(document).ready(() => {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const firstName = $("input#first_name");
    const lastName = $("input#last_name");
    const companyName = $("input#company_name");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", event => {
      event.preventDefault();
      const userData = {
        first_name: firstName.val().trim(),
        last_name: lastName.val().trim(),
        company_name: companyName.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      // signUpUser(userData.email, userData.password);
      // emailInput.val("");
      // passwordInput.val("");
  
      signUpUser(userData);
      firstName.val("");
      lastName.val("");
      companyName.val("");
      emailInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser({first_name, last_name, company_name, email, password}) {
      $.post("/api/signup", {
        first_name, last_name, company_name,
        email: email,
        password: password
      })
        .then(() => {
          window.location.replace("/members");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON.errors[0].message);
      $("#alert").fadeIn(500);
    }
  });
  