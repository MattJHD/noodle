Noodle.io
=========

Noodle is a shared canvas application using websockets. 
Backend : Express - socket.io - mongodb
Frontend: React

Installation
--------------------
1. Clone the repository git clone https://github.com/MattJHD/noodle.git
2. Go in the project repository and run npm install which will install all the packages needed for the server
3. Go in the client folder cd client
4. Run npm install to install all the client side packages
5. To run the application, npm run dev it will run the dev server on port 5000 and the client on port 3000 by default using concurrently


Directory Structure:
--------------------
```
.
├── LICENSE.txt
├── Procfile
├── README.md
├── server.js
├── package.json
├── public
│   ├── css
│   │   └── canvas_style.css
│   ├── js
│   │   ├── canvas.js
│   │   └── draw.js
│   ├── libs
│   │   └── paper-full.min.js
│   ├── res
│   │   ├── colorChooser.gif
│   │   └── transChooser.gif
│   └── templates
│       ├── canvas.jade
│       └── login.jade
└── src
│   ├── canvas_server.js
│   └── users.js
│ 
└── client
│   └── public
│       └── manifest.json
│   └── src
│       └── components
│           ├── home
│           ├── login
│           ├── register
│           ├── rooms
│           ├── wall
│           └── nav
│       ├── App.css
│       ├── App.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       └── registerServiceWorker.js
│   └── package.json
│   └── .gitignore
│   └── README.md
```

