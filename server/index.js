// import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')

// app instance
const app = express();

// middleware
app.use(cors())

// request body
app.use(express.json());

// static file serve
app.use(express.static(path.join(__dirname, 'public')));

// mongoose instance
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce')
    .then(() => {
        console.log("database connection established");
    }).catch((error) => {
        console.log(error);
    })

// import routes
const adminRoutes = require("./routes/admin/admin.route")
const frontRoutes = require("./routes/front/front.route")

app.use('/api/admin', adminRoutes);
app.use('/api', frontRoutes);


// port
const PORT = process.env.PORT || 8000;

// server listen
app.listen(PORT, function () {
    console.log(`server listening on ${PORT}`);
})