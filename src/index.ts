import express from "express";
import bodyParser from "body-parser";
import { Request } from "express";
import {productSlaves} from "./data/productSlaves";
import { Response } from "express";
import {IDataBase, IproductSlaves, IResponse} from "./interfaces/productSlaves";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "./types/types";
import {CourseCreateInputModel} from "./models/CreateCourseModel";
import {CourseViewModel} from "./models/CourseViewModel";
export const app = express()
const port = process.env.PORT || 5000

// middleware
const parserMiddleWare = bodyParser();
app.use(parserMiddleWare)


const db: IDataBase = {
    courses: [
        {id: 1, title: "front", studentsCount: 10},
        {id: 2, title: "bek", studentsCount: 5},
        {id: 3, title: "devops", studentsCount: 15}],
}


// requests
app.get('/courses', (req: RequestWithQuery<{title: string}>, res: Response<CourseViewModel[]>) => {
    let foundCourses = db.courses;

    if (req.query.title) {
        foundCourses = foundCourses.filter(item => item.title.indexOf(req.query.title as string) > -1)
    }

    res.json(foundCourses.map(item => {
        return {
            id: item.id,
            title: item.title
        }
    }))


})

app.get("/courses/:id", (req: RequestWithParams<{id: number | string}>, res:Response<CourseViewModel>) => {
    const foundCourses = db.courses.find(item => item.id === +req.params.id)

    if(!foundCourses) return res.sendStatus(404)

    res.send(foundCourses)
})

app.post("/courses", (req: RequestWithBody<CourseCreateInputModel>, res:Response<IResponse>) => {
    if(!req.body.title) {
        return res.sendStatus(404);
    }

    const createdCourse:IResponse = {
        id: +(new Date()),
        title: req.body.title,
        studentsCount: 5,
    }
    db.courses.push(createdCourse);

    res.status(201).json(createdCourse);
})

app.delete("/courses/:id", (req:RequestWithParams<{id: string}>,res) => {
    db.courses = db.courses.filter(item => item.id !== +req.params.id)
    res.send(204)
})

app.put("/courses/:id", (req:RequestWithParamsAndBody<{id: string}, {title: string}>, res) => {
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