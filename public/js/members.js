$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.company_name);
  });

  $("button.addVehicleBtn").on("click", function(event){
    event.preventDefault();
    window.location.replace("/vehicles")
  });
});
