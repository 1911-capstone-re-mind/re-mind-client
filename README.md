# Welcome to re:mind - your workplace wellness app

**Note: This project was built with re:mind server (https://github.com/1911-capstone-re-mind/re-mind-server)**

## re:minders to stay healthy

re:mind is a desktop workplace wellness app that gives you notifications to:

* Check your posture throughout the day
* Get up from your chair and move around
* Look away from your computer screen to prevent eye strain
* Stay hydrated throughout the day
* Take some time to de-stress

<image alt="main page" src="./readmeImages/main.png" width="300px">

This project was built using [Electron](https://www.electronjs.org), a framework that allows you to create desktop applications with web technologies. Other technologies include React.js, Redux.js, and HTML/CSS. Re:mind server was built with Express.js and PostgreSQL.

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

## Download And Installation

Please go [here](https://drive.google.com/drive/u/0/folders/1xe70x3y9t4lIF8oBOLPZfPCGqrMJmhoC) to download the appropriate installer for your machine. Once it is downloaded, open the file and follow the directions.

## Running From Source

**Note: This will run re:mind client. If you would like to run re:mind server as well, you must also clone and follow the installation instructions for [re:mind server](https://github.com/1911-capstone-re-mind/re-mind-server). You must also change the URL of the api routes on re:mind client to match the port you are running re:mind server on.**

Clone this repository. You must have node and npm installed globally on your machine.

Installation:

`npm install`

Start application:

`npm run start`

## Project Information

This was a two and a half week capstone project for four students at [Fullstack Academy](https://www.fullstackacademy.com) in Chicago. The goal of this project was to challenge ourselves creating an ambitious application using the skills we have learned so far.
