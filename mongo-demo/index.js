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
    // or
    // and

    const courses = await Course
        // .find({author: 'Mosh', isPublished: true})

        // Starts with 'Mosh'
        .find({author: /^Mosh/})

        // Ends with 'Hamedani'
        .find({author: /Hamedani$/i})   // i makes the expression case-insensitive

        // Contains 'Mosh'
        .find({author: /.*Mosh.*/})

        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    console.log(courses);
}

getCourses();