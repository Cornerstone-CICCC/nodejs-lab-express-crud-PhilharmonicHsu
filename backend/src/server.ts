import express from 'express'
import employeeRouter from './routes/employee.routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/employees', employeeRouter)

const PORT = 3500;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} ....`);
})