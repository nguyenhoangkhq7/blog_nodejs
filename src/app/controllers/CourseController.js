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
        req.body.img = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const course = new Course(req.body);
        await course
            .save()
            .then(res.redirect('/me/stored/courses'))
            .catch(next);
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
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(res.redirect('back'))
            .catch(next);
    }
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete': {
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(res.redirect('back'))
                    .catch(next);
            }
            default: {
                res.json('Action is invalid');
            }
        }
        // res.json(req.body);
    }
}

module.exports = new CourseController();
