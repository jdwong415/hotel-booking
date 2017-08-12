# Chez Jerome
An internal hotel management application using Node.js, Express, Sequelize, Handlebars.js and Passport.js

### Table of Contents 

1. [About](#about)
2. [Guest View](#guest)
3. [Manager View](#manager)
4. [Demo](#demo)

<a name="about"></a>
### About
Allows guests to book a room, reserve a table at the hotel's restaurant, and search for nearby things to do using Yelp's Fusion API.
Allows managers to view room availability, current guests, checkin and checkout guests, and restaurant table reservations.

<a name="guest"></a>
### Guest View
Booking a room:<br>
<img src="./public/assets/img/book.png" width="500px">

Once a guest books a room, they can login and view their room info and guest options:<br>
<img src="./public/assets/img/guest.png" width="500px">

Guests can reserve a table at the restaurant:<br>
<img src="./public/assets/img/reserve.png" width="500px">

They can also search for nearby locations:<br>
<img src="./public/assets/img/yelp.png" width="500px">

<a name="manager"></a>
### Manager View
The manager view is hidden from the main view. The Manager Portal route is: `/admin`
<br>
Managers need to be signed up to login. Mangers can view room availability, check in and check out guests, and view current reservations at the restaurant.<br>
<img src="./public/assets/img/rooms.png" width="500px"><br><br>
An admin account has already been created on the demo:
<br>Email: admin@admin.com
<br>Password: admin

<a name="demo"></a>
### Demo
https://fierce-woodland-16916.herokuapp.com
<br>
Manager Portal: https://fierce-woodland-16916.herokuapp.com/admin
