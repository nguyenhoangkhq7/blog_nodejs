module.exports = {
    mongoosesToObject(courses) {
        return courses.map((course) => course.toObject());
    },
    mongooseToObject(course) {
        return course ? course.toObject() : course;
    },
};
