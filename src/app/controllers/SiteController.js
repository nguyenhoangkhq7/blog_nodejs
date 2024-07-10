const Course = require('../models/Course'); // import model
const { mongoosesToObject } = require('../../util/mongoose');
class SiteController {
    index(req, res, next) {
        // try {
        //     const courses = await Course.find({});
        //     res.json(courses);
        // } catch (err) {
        //     next(err);
        // }
        // cách viết promise
        Course.find({})
            .then((courses) => {
                res.render('home', { courses: mongoosesToObject(courses) });
            })
            .catch(next);
    }

    search(req, res) {
        // [GET] /search
        res.render('search');
    }
}

module.exports = new SiteController();
