import express from 'express'
import 'dotenv/config'

import sequelize  from './DB/db.js';
import bodyParser from 'body-parser'
import cors from 'cors'

import restaurantRouter from './routes/restaurantRoutes.js'

const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit : "30mb"}));
app.use(cors());


app.use('/api/v1/restaurant', restaurantRouter)

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Server is running on port ${port}`);
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

  (async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }

   
    app.listen(port, () => {
        connectToDatabase();
    });
})();


    