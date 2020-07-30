const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'blog 1',
    author: 'author 1',
    url: 'url',
    likes: 2,
  },
  {
    title: 'blog 2',
    author: 'author 2',
    url: 'url',
    likes: 4,
  },
]

/*

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

*/

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  // nonExistingId,
  blogsInDb,
}
