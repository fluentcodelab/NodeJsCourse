import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now()},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const pageNumber = 1;
    const pageSize = 10;

    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .count();
    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    // course.isPublished = true;
    // course.author = 'John Doe';

    // Alternatively
    course.set({
        isPublished: true,
        author: `Jane Doe`
    });

    const result = await course.save();
    console.log(result);
}

updateCourse('6507a6fdfd92b7b8146af240');