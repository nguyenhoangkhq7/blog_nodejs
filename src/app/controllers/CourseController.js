const Course = require('../models/Course'); //model
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        // lấy dữ liệu - để lấy dữ liệu thì cần model
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
        //render ra view
    }
    // [GET] courses/create
    create(req, res, next) {
        res.render('courses/create');
    }
    // [POST] /courses/store
    async store(req, res, next) {
        const formData = req.body;
        formData.img = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const course = new Course(req.body);
        await course.save().then(res.redirect('/')).catch(next);
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
        // res.render('courses/edit');
    }
}

module.exports = new CourseController();
