class Bus {
  constructor(destination, capacity = 30) {
    this.destination = destination;
    this.seats = Array(capacity).fill(null); //Initialize an array of seats with null (empty) values
  }
}

class TicketPerson {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

// this is the ticket person username and password
const ticketPersons = [
  new TicketPerson("admin", "password123"),
  new TicketPerson("user1", "pass1234"),
];

//on this part the program will check the authentication of the entered username and password of tghe ticket person
function authenticateTicketPerson(username, password) {
  return ticketPersons.some(
    (person) => person.username === username && person.password === password
  );
}

function viewBusPassengers(bus) {
  console.log(`Bus Destination: ${bus.destination}`);
  bus.seats.forEach((seat, index) => {
    //on this part this will log the seat number and customer's name (or "AVAILABLE" if empty) to the console
    console.log(`Seat No.: ${index + 1}, Customer Name: ${seat || "AVAILABLE"}`);
  });
}

function manageBus(bus) {
  while (true) {
    console.log("\nBus Management Options:");
    console.log("1. Add Reservation");
    console.log("2. Remove Reservation");
    console.log("3. Cancel");
    const choice = prompt("Enter your choice:");

    if (choice === "1") {
      while (true) {
        const seatNo = parseInt(prompt("Enter seat number to add reservation:")) - 1;
        if (isNaN(seatNo) || seatNo < 0 || seatNo >= bus.seats.length) {
          console.log("Invalid seat number.");
          continue;
        }
        if (bus.seats[seatNo] === null) {
          const customerName = prompt("Enter customer name:");
          bus.seats[seatNo] = customerName;
          console.log("Reservation added successfully.");
        } else {
          console.log("Seat is already occupied.");
        }
        if (
          !confirm("Add another reservation? (OK for Yes, Cancel for No)")
        ) {
          break;
        }
      }
    } else if (choice === "2") {
      // a loop for removing reservations
      while (true) {
        const seatNo = parseInt(prompt("Enter seat number to remove reservation:")) - 1; // to get the number seat from the user
        if (isNaN(seatNo) || seatNo < 0 || seatNo >= bus.seats.length) { // this validate the seat number
          console.log("Invalid seat number.");
          continue;
        }
        if (bus.seats[seatNo]) {
          bus.seats[seatNo] = null;
          console.log("Reservation removed successfully."); // when the reservation were succesfully remove
        } else {
          console.log("Seat is already empty."); // this log in the console when the seat is already empty
        }
        if (
          !confirm("Remove another reservation? (OK for Yes, Cancel for No)") //confirming if the user wants to remove another reservation
        ) {
          break;
        }
      }
    } else if (choice === "3") { // choice 3 which is the exit
      break;
    } else {
      console.log("Invalid choice."); // when the choice is invalid
    }
  }
}

// Define buses
const buses = [
  new Bus("Cubao"),
  new Bus("Baguio"),
  new Bus("Pasay"),
];

// Function to sort buses alphabetically by destination
function sortBusesByDestination(buses) {
  return buses.sort((a, b) => { // using sort() method to sort the busses
    if (a.destination < b.destination) { // If the first bus' destination comes before the second, return -1
      return -1;
    }
    if (a.destination > b.destination) {
      return 1;
    }
    return 0; // If the destinations are the same, return 0
  });
}


//the program will isplay the main menu to the user
while (true) {
  //this is the first part to display in program when you run the source code
  console.log("\nWelcome to Bus Reservation System");
  console.log("1. Ticket Person");
  console.log("2. Customer");
  console.log("3. Exit");
  const userChoice = prompt("Enter your choice:"); // on this part the program will ask the user to enter the number of their choices

  if (userChoice === "1") { // this function is when you choose number 1 which the ticket person
    const username = prompt("Enter username:"); //the program will ask the ticket person to enter the username
    const password = prompt("Enter password:"); //and this is to enter the password

    if (authenticateTicketPerson(username, password)) {
      while (true) { // this part will display in program when you choose 1 ehich is the ticket person
        console.log("\nTicket Person Menu");
        console.log("1. View Buses"); // to view
        console.log("2. Manage Bus"); // to manage the bus
        console.log("3. Logout"); // choose 3 when u want to log out
        const ticketPersonChoice = prompt("Enter your choice:"); //enter only the number of ur choice

        if (ticketPersonChoice === "1") {
          // Sort buses alphabetically before displaying
          const sortedBuses = sortBusesByDestination([...buses]); 
          sortedBuses.forEach((bus, index) => {
            console.log(`\nBus ${index + 1}:`);
            viewBusPassengers(bus);
          });
          prompt("Press Enter to continue...");
        } else if (ticketPersonChoice === "2") { //Get the bus number to manage from the user
          const busIndex =
            parseInt(prompt("Enter bus number to manage (1-3):")) - 1; // to manage the selected bus
          if (busIndex >= 0 && busIndex < buses.length) {
            manageBus(buses[busIndex]);
          } else {
            console.log("Invalid bus number."); //if the bus number entered is invalid
          }
        } else if (ticketPersonChoice === "3") {
          break;
        } else {
          console.log("Invalid choice."); // if the user choice is invalid the program will log this in console
        }
      }
    } else {
      console.log("Invalid username or password."); // if the entered usernmae and password is invalid
    }
  } else if (userChoice === "2") { //customer menu
    while (true) {
      console.log("\nCustomer Menu");
      console.log("1. Reserve Seat");
      console.log("2. Cancel Reservation");
      console.log("3. Cancel");
      const customerChoice = prompt("Enter your choice:"); // to enter the customer's choice in the console

      if (customerChoice === "1") { //reservinhg seat
        console.log("\nAvailable Buses:");
        // this sort the busses alphabetically before the program display it
        const sortedBuses = sortBusesByDestination([...buses]); 
        sortedBuses.forEach((bus, index) => {
          console.log(`${index + 1}. ${bus.destination}`);
        });
        const busIndex = parseInt(prompt("Enter bus number:")) - 1; //enter the b us number
        if (busIndex >= 0 && busIndex < buses.length) {
          const bus = buses[busIndex];
          const availableSeats = bus.seats
            .map((seat, index) => (seat === null ? index + 1 : null))
            .filter(Boolean);
          if (availableSeats.length > 0) {
            console.log("\nAvailable Seats:", availableSeats);
            const seatNo = parseInt(prompt("Enter seat number:")) - 1; // enter the seat number
            if (
              seatNo >= 0 &&
              seatNo < bus.seats.length &&
              bus.seats[seatNo] === null
            ) {
              const customerName = prompt("Enter your name:"); //entering the customer name
              bus.seats[seatNo] = customerName;
              console.log("\nReservation successful!"); //display when reservation is full
            } else {
              console.log("Seat is not available."); // when seat is no longer availabale
            }
          } else {
            console.log("Bus is fully booked."); //when bus is fully booked
          }
        } else {
          console.log("Invalid bus number."); // this print if the bus number is invalid
        }
      } else if (customerChoice === "2") {
        const busIndex = parseInt(prompt("Enter bus number:")) - 1;
        if (busIndex >= 0 && busIndex < buses.length) {
          const bus = buses[busIndex];
          const customerName = prompt("Enter your name:"); //the program will ask the user to enter the name
          const seatIndex = bus.seats.findIndex(
            (name) => name === customerName
          );
          if (seatIndex !== -1) {
            if (
              confirm( // this confirms if the user really want to cancel the reservation seat
                `Are you sure you want to cancel reservation for seat ${
                  seatIndex + 1
                }? (OK for Yes, Cancel for No)`
              )
            ) {
              bus.seats[seatIndex] = null;
              console.log("Reservation canceled."); // display when reservation is cancelled
            }
          } else {
            console.log("Reservation not found."); //this display in program when reservation is not found
          }
        } else {
          console.log("Invalid bus number."); //display when the invalid bus num
        }
      } else if (customerChoice === "3") {
        break;
      } else {
        console.log("Invalid choice."); // when choice is invalid
      }
    }
  } else if (userChoice === "3") {
    console.log("Exiting...");
    break;
  } else {
    console.log("Invalid choice.");
  }
}