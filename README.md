
# tree-graph

App development flow chart builder


## Purpose

In general, in every app, each screen will have some user interactions.

After each action by user like tap or click on some button, the UI will change no-matter how small the UI change will be.

To visualize these UI changes for every action, this Tree-Graph will be helpful. 

Managers and teams can easily create user stories and visualize user journeys with this.


## Setup

Install Node JS v10+

Clone the repo.

Setup a webserver of your choice. I use apache virtualhost.

Point the webserver to **public** folder inside the project root.
This is where **index.html** resides.

Run `npm install`

Then run `npm run build`
This will start webpack to build and also observe for file changes.
However, the page needs to be reloaded manually in the browser after webpack completes the build.

## Tech

* HTML
* CSS
* Javascript (ES6, No frameworks)
* Some node_modules :boom:


