const Course = require('../models/Course'); //model
const { mongoosesToObject } = require('../../util/mongoose');
class MeController {
    // [GET] /me/stored
    index(req, res, next) {
        res.SEND('HEHE');
    }

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let coursesQuery = Course.find({ deleted: { $ne: true } });

        if (req.query.hasOwnProperty('_sort')) {
            coursesQuery = coursesQuery
                .sort({
                    [req.query.column]: ['desc', 'asc'].includes(req.query.type)
                        ? req.query.type
                        : 'desc',
                })
                .then()
                .catch(next);
        }

        Promise.all([
            coursesQuery,
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deleteCount]) => {
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: mongoosesToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: mongoosesToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
