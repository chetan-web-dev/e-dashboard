<h1>MERN E-Dashboard Application</h1>

<p>
This project is a reference implementation of an <strong>E-Dashboard / E-Commerce</strong> application built using the 
<strong>MongoDB, Express, React, and Node.js (MERN)</strong> stack.
</p>

<h2>🚀 Tech Stack</h2>

<ul>
  <li><strong>MongoDB</strong> – Database (Atlas or Compass)</li>
  <li><strong>Express.js</strong> – Backend framework</li>
  <li><strong>Node.js</strong> – Runtime environment</li>
  <li><strong>React.js</strong> – Frontend library</li>
</ul>

<h2>🛠 Tools Used</h2>

<ul>
  <li>MongoDB Atlas (Cloud Database)</li>
  <li>MongoDB Compass (GUI Tool)</li>
  <li>Postman (API Testing)</li>
  <li>Nodemon (Backend auto-restart)</li>
</ul>

<h2>📋 Prerequisites</h2>

<ul>
  <li>Node.js v18.8.0 (Tested)</li>
  <li>MongoDB v6.0.4</li>
  <li>MongoDB Atlas account OR MongoDB Compass</li>
</ul>

<h2>🗄 Database Setup</h2>

Using MongoDB Compass or MongoDB Shell:

<pre>
use e-commerce
</pre>

Database Name:
<pre>
e-commerce
</pre>

(Collections will be created automatically when the application runs.)

<h2>⚙ Backend Setup</h2>

<pre>
mkdir e-dashboard
cd e-dashboard/backend
npm install
</pre>

<h2>💻 Frontend Setup</h2>

<pre>
cd e-dashboard/front-end
npm install
</pre>

<h2>▶ Run Application</h2>

<h3>Start Backend</h3>

<pre>
cd e-dashboard/backend
nodemon index.js
</pre>

Backend will run on:
<pre>
http://localhost:7000
</pre>

<h3>Start Frontend</h3>

<pre>
cd e-dashboard/front-end
npm start
</pre>

Frontend will run on:
<pre>
http://localhost:3000
</pre>

<h2>🏗 Architecture</h2>

The backend follows a layered modular architecture:

<ul>
  <li>Routes Layer</li>
  <li>Controller Layer</li>
  <li>Service Layer</li>
  <li>Repository/Data Access Layer</li>
  <li>Middleware</li>
</ul>

<h2>🔐 Environment Variables</h2>

Create a <code>.env</code> file inside the backend directory and configure:

<pre>
PORT=7000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
</pre>

⚠ Do NOT commit the .env file to version control.
