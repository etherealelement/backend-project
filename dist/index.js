"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// middleware
const parserMiddleWare = (0, body_parser_1.default)();
exports.app.use(parserMiddleWare);
const db = {
    courses: [{ id: 1, title: "front" }, { id: 2, title: "bek" }, { id: 3, title: "devops" }],
};
// requests
exports.app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(item => item.title.indexOf(req.query.title) > -1);
    }
    res.send(foundCourses);
});
exports.app.get("/courses/:id", (req, res) => {
    const foundCourses = db.courses.find(item => item.id === +req.params.id);
    if (!foundCourses)
        return res.sendStatus(404);
    res.send(foundCourses);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
