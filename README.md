# Welcome to re:mind - your workplace wellness app

**Note: This project must run with re:mind server (https://github.com/1911-capstone-re-mind/re-mind-server)**

## re:minders to stay healthy

re:mind is a desktop workplace wellness app that gives you notifications to:

* Check your posture throughout the day
* Get up from your chair and move around
* Look away from your computer screen to prevent eye strain
* Stay hydrated throughout the day
* Take some time to de-stress

<image alt="main page" src="./readmeImages/main.png" width="300px">

This project was built using [Electron](https://www.electronjs.org), a framework that allows you to create desktop applications with web technologies. Other technologies include React.js, Redux.js, and HTML/CSS.

## Features

* Upon sign up, users can enable any number of notificaitons they would like to receive.
* Users can edit the time intervals between notifications and duration for the breaks (if applicable).
* When it's time for a break, users will either receive a notification for posture and hydration checks, or a pop up window that users can interact with for movement, vision, and mindfulness breaks.

<image alt="posture notification" src="./readmeImages/posture_notif.png" width="300px"><br/>

<image alt="movement notification" src="./readmeImages/movement_notif.png" width="300px">

* Upon starting movement, vision, and mindfulness breaks, the pop up window will change to a timer that keeps track of how much time is left in a break.

<image alt="movement countdown" src="./readmeImages/movement_countdown.png" width="300px">

* A dashboard will show information about a user's breaks and notifications.

<image alt="dashboard" src="./readmeImages/dashboard.png" width="300px">

## Installation and Setup Instructions

**Note: To run this app, you must also clone and follow the installation instructions for [re:mind server](https://github.com/1911-capstone-re-mind/re-mind-server)**

Clone this repository. You must have node and npm installed globally on your machine.

Installation:

`npm install`

Start application:

`npm run start`

## Project Information

This was a two and a half week capstone project for four students at [Fullstack Academy](https://www.fullstackacademy.com) in Chicago. The goal of this project was to challenge ourselves creating an ambitious application using the skills we have learned so far.

This project allowed us to utilize our skills in the web technologies we learned and apply them in a new way. Since operating systems can have many multiple processes unlike a web application, careful design of the application architexture was very important from the beginning. We had to make sure that the many different components of our application communicated together in a reliable way. We also had the opportunity to use the resources of our machine's operating system to store files and send notifications to the user.

Communication between difference processes was one of the most difficult challenges fo this project. Since we created timers to keep track of reminders and allowed user input, we had to carefully come up with a fail-safe design for the application to prevent race conditions and unexpected behaviors.

Another challenge we faced was splitting up the client and server into different locations (desktop client and remote server). Since the two were not served from the same location, we had to think about how to configure the server endpoints and client requests to ensure reliable communication.
