import express from "express";
import bodyParser from "body-parser";
import { Request } from "express";
import {productSlaves} from "./data/productSlaves";
import { Response } from "express";
import {IDataBase, IproductSlaves, IResponse} from "./interfaces/productSlaves";
export const app = express()
const port = process.env.PORT || 5000

// middleware
const parserMiddleWare = bodyParser();
app.use(parserMiddleWare)


const db: IDataBase = {
    courses: [{id: 1, title: "front"}, {id: 2, title: "bek"}, {id: 3, title: "devops"}],
}


// requests
app.get('/courses', (req: Request<{},{},{title: string}>, res: Response<IResponse[]>) => {
    let foundCourse = db.courses;

    if (req.query.title) {
        foundCourse = foundCourse.filter(item => item.title.indexOf(req.query.title as string) > -1)
    }
    res.send(foundCourse);
})

app.get("/courses/:id", (req: Request<{id: number | string}>, res) => {
    const foundCourses = db.courses.find(item => item.id === +req.params.id)

    if(!foundCourses) return res.sendStatus(404)

    res.send(foundCourses)
})

app.post("/courses", (req: Request<{}, {}, {title: string}>, res:Response<IResponse>) => {
    if(!req.body.title) {
        return res.sendStatus(404);
    }

    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    }
    db.courses.push(createdCourse);

    res.status(201).json(createdCourse);
})

app.delete("/courses/:id", (req:Request<{id: string}>,res) => {
    db.courses = db.courses.filter(item => item.id !== +req.params.id)
    res.send(204)
})

app.put("/courses/:id", (req:Request<{id: string}, {}, {title: string}>, res) => {
    if(! +req.body.title) {
        res.sendStatus(404)
        return
    }

    const foundCourse = db.courses.find(item => item.id === +req.params.id)

    if (!foundCourse) {
        res.sendStatus(404)
        return
    }

    foundCourse.title = req.body.title

    res.sendStatus(204);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})