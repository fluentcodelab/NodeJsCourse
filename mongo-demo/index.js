import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: [`web`, `mobile`, `network`]
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: `A course should have at least one tag.`
        }
    },
    date: {type: Date, default: Date.now()},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: `finance`,
        author: 'Mosh',
        tags: [],
        isPublished: true,
        price: 20
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (e) {
        for (const field in e.errors) {
            console.log(e.errors[field].message);
        }
        // `finance` is not a valid enum value for path `category`.
        // A course should have at least one tag.
    }
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
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: `Um Nyobe`,
            isPublished: true
        }
    }, {new: true});
    console.log(course);
}

async function removeCourse(id) {
    const result = await Course.deleteOne({_id: id});
    console.log(result);
}

createCourse();