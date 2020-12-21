$(document).ready(() => {
  // This file just does a POST to enter vehicle information into the database.
  const vehicleForm = $("form.vehicle") 
  const vehicleMake = $("input#vehicle_make");
  const lastMileage = $("input#last_mileage");
  const currentDriver = $("input#current_driver");
  const currentLocation = $("input#current_location");
  const regExp = $("input#reg_exp");
  const lastOilchange = $("input#last_oilchange");
  const reportedProb = $("textarea#reported_problems");

  
  
  vehicleForm.on("submit", function(event){
    event.preventDefault();
    const vehicleData = {
      vehicle_make: vehicleMake.val().trim(),
      last_mileage: lastMileage.val().trim(),
      current_driver: currentDriver.val().trim(),
      current_location: currentLocation.val().trim(),
      reg_exp: regExp.val().trim(),
      last_oilchange: lastOilchange.val().trim(),
      reported_problems: reportedProb.val().trim()
    }
    addVehicle(vehicleData);
    vehicleMake.val("");
    lastMileage.val("");
    currentDriver.val("");
    currentLocation.val("");
    regExp.val("");
    lastOilchange.val("");
    reportedProb.val("");
  });


    function addVehicle({vehicle_make, last_mileage, current_driver, current_location, reg_exp, last_oilchange, reported_problems}) {
      $.post("/api/vehicles", {
        vehicle_make,
        last_mileage,
        current_driver,
        current_location,
        reg_exp,
        last_oilchange,
        reported_problems
      })
      .then(() => {
        window.location.replace("/members");
        alert("Vehicle has been added");
      })
      .catch(handleError);
    }

    function handleError(err) {
        $("#alert .msg").text(err.responseJSON.errors[0].message);
        $("#alert").fadeIn(500);
      }
});  
  