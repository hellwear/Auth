const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter.js');
const PORT = process.env.PORT || 4001;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = () => {
    try {
        mongoose.connect(`mongodb+srv://qwerty:qwerty123@users.3ssmc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server started on http://127.0.0.1:${PORT}/`));        
    } catch (e) {
        console.log(e);
    }
}

start();