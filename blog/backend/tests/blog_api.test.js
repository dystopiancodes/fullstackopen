const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id property exist', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'blog 1',
    author: 'author 1',
    url: 'url',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('a blog with no likes is 0', async () => {
  const newBlog = {
    title: 'no likes',
    author: 'author 1',
    url: 'url',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('a blog with no titles is not created', async () => {
  const newBlog = {
    author: 'author 1',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('a blog with no url is not created', async () => {
  const newBlog = {
    author: 'author 1',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('updating of a blog', () => {
  test('succeeds with status code 204 ', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    console.log(blogToUpdate.id)

    blogToUpdate.likes = 20

    await api.put(`/api/blogs/${blogToUpdate.id}`).expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(20)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
