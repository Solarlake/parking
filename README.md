# Middlelane
---

## Inspiration
Parking on campus is...difficult. You'll often find yourself driving up and down every single row of a lot, scanning left and right, hoping to catch an empty spot. What if there was an easier way? What if you could see what spots were available at a glance, so that you can stay safe and park as close to the destination as possible, especially in the evening?

## What it does
Middlelane uses a camera placed in a strategically high location near a parking lot and a computer vision model to obtain parking data and generate a birds-eye view for a given lot. 

## How we built it
The computer vision is done with YOLO. The web demo is built with Flask, and uses Three.JS for the rendering.

## Challenges we ran into
We ran into a fair bit of import troubles with the JS libraries, but those were resolved eventually. We also initially had identification issues with our parking lot photos, but that was fixed by using a larger dataset.

## Accomplishments that we're proud of
Getting a live transfer of data between the computer vision model and the front-end renderer using sockets.

## What we learned
YOLO, Flask, Three.JS

## What's next for Middlelane
The next big step for this project is setting up a semi-permanent camera over a test parking lot and streaming the data to our server on demand. Then, we can modify the app to use GPS location to show the user a convenient, birds-eye view for the parking lot they are currently entering. 

Additionally, since we generate a 3D model based on the parking data, we should be able to offer the user more than just the birds-eye perspective if they would prefer to view it from another direction or angle.