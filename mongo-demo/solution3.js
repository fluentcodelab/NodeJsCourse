import mongoose from 'mongoose';

/*
* Requirements
*
* Get all the published courses that are $15 or more,
* or have the word `by` in their title,
*
* */

mongoose.connect('mongodb://127.0.0.1:27017/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({isPublished: true})
        .or([{price: {$gte: 15}}, {name: /.*by.*/i}])
        .sort({price: -1})
        .select({name: 1, author: 1, price: 1});
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();