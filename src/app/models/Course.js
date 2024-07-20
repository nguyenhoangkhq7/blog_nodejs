const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
    {
        name: { type: String, require: true },
        img: { type: String },
        description: { type: String },
        videoID: { type: String, require: true },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    }
);

// add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
// [
//     'find',
//     'restore',
//     'findDeleted',
//     'countDocumentsWithDeleted',
// ]
module.exports = mongoose.model('Course', Course);
