const Course = require('../models/Course'); //model
const { mongoosesToObject } = require('../../util/mongoose');
class MeController {
    // [GET] /me/stored
    index(req, res, next) {
        res.SEND('HEHE');
    }

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('me/stored-courses', {
                    courses: mongoosesToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
