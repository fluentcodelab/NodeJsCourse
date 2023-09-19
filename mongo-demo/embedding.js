import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  }),
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // Option 1
  // const course = await Course.findById(courseId);
  // // The embedded document 'author' state can only be modified through its parent document
  // course.author.name = "John Doe";
  // course.save();

  // Option 2
  const course = await Course.updateOne(
    { _id: courseId },
    {
      // unset removes the subdocument
      // $unset: { "author": '' },
      $set: { "author.name": "Jane Doe" },
    },
  );

  console.log(course);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
  console.log(course);
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.deleteOne();
  course.save();
}

// createCourse("Node Course", [
//   new Author({ name: "John Doe" }),
//   new Author({ name: "Jane Doe" }),
// ]);

// updateAuthor("6508fad6fad2b79e552e8ca3");

// addAuthor("6508ff00b80a9bd6d0e48c12", new Author({ name: "Alpha Blondy" }));
removeAuthor("6508ff00b80a9bd6d0e48c12", "6508ff00b80a9bd6d0e48c10");
