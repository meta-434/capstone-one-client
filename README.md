# Pomodoro App

This is a pomodoro timer app that optionally allows users to save unique pomodoro session information and notes
for reference during work.

+ Server repo found [here](https://github.com/meta-434/capstone-one-server)
+ Live site found [here](pomodoro.alex-hapgood.info)

## Concept
The design of the Pomodoro App intends to provide the user with a fully-featured digital pomodoro timer, complete 
with session saving and notes for reference. A signed up user, upon completion of a 25-minute pomdoro work session,
may save the details of the session to the server. The timestamped session saves under the user's unique account credentials,
which the user may review at a later time. Notes may be similarly saved, and the timer page displays the most recent
note for reference during work sessions. 

## Set up

set up the server, from `https://github.com/meta-434/capstone-one-server`

1. Clone this repository to your local machine `git clone https://github.com/meta-434/capstone-one-client.git`
2. `cd` into the cloned repository
4. Install the node dependencies `npm install`
5. Edit the `.env` that will be ignored by git with `REACT_APP_SERVER_URL` equal to the address of the server

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

# Notes

to use a pre-made account without needing to sign up, use 

username: `test-user`
<br />
password: `test-password`

if nothing appears to happen when trying to use the app, wait 30-45 seconds for the hosted database to spin up.

# Tech

+ React
+ React-Router-Dom
+ Context API
+ CSS
+ Jest

# Screenshots

timer:
<br />
![alt text]( src/images/timer.png "timer component")

sessions display: 
<br />
![alt text]( src/images/sessions.png "sessions component")

notes display: 
<br />
![alt text]( src/images/notes.png "notes component")
