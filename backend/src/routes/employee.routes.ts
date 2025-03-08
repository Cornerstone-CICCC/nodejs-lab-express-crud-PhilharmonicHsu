import {Router, Request, Response} from 'express';
import { Employee } from '../types/employee';
import { v4 as uuidv4 } from 'uuid'

const employeeRouter = Router();

const employees: Employee[] = [
    {
        id: 'yuwrohewoq7cysahouighr',
        firstname: 'John',
        lastname: 'Smith',
        age: 40,
        isMarried: false
    },
    {
        id: '0f89r32hpiglp8dgasuh',
        firstname: 'Jane',
        lastname: 'Doe',
        age: 30,
        isMarried: true
    },
    {
        id: 'dlwhfobrpwguhedsf',
        firstname: 'Joe',
        lastname: 'Moe',
        age: 10,
        isMarried: false
    }
];

employeeRouter.get('/', (request: Request, response: Response) => {
    response.status(200).json(employees);
});

employeeRouter.get('/search', (request: Request<{}, {firstname: string}>, response: Response)=> {
    const targetFirstname = request.query.firstname
    if (! targetFirstname) {
        response.status(200).json(employees)

        return;
    }

    const result = employees.filter(employee => employee.firstname === targetFirstname)

    response.status(200).json(result)
});

employeeRouter.get('/:id', (request: Request<{id: string}>, response: Response) => {
    const {id} = request.params;
    const employee = employees.find(employee => employee.id === id);

    if (! employee) {
        response.status(404).send("Employee not found")

        return
    }

    response.status(200).json(employee);
});

employeeRouter.post('/', (request: Request<{}, {}, Omit<Employee, 'id'>>, response: Response) => {
    const newEmployee: Employee = {
        id: uuidv4(),
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        age: request.body.age,
        isMarried: request.body.isMarried
    }

    employees.push(newEmployee);

    response.status(200).json(newEmployee);
});

employeeRouter.put('/:id', (request: Request<{id:string}, {}, Partial<Employee>>, response: Response) => {
    const {id} = request.params;
    const foundIndex = employees.findIndex(employee => employee.id === id);
    
    if (foundIndex === -1) {
        response.status(404).send("Employee not found");

        return;
    }

    const updatedEmployee: Employee = {
        ...employees[foundIndex],
        firstname: request.body.firstname ?? employees[foundIndex].firstname,
        lastname: request.body.lastname ?? employees[foundIndex].lastname,
        age: request.body.age ?? employees[foundIndex].age,
        isMarried: request.body.isMarried ?? employees[foundIndex].isMarried,
    }

    employees[foundIndex] = updatedEmployee;

    response.status(200).json(updatedEmployee);
});

employeeRouter.delete('/:id', (request: Request<{id: string}>, response: Response) => {
    const {id} = request.params;
    const foundIndex = employees.findIndex(employee => employee.id === id)
    if (foundIndex === -1) {
        response.status(404).send("Employee not found")

        return
    }
    employees.splice(foundIndex, 1)
    response.status(200).send("Employee was deleted!")
});

export default employeeRouter;