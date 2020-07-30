const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('hihest likes', () => {
  const blogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'High',
      author: 'Edsger W. Dijkstra',
      likes: 6,
    },
  ]

  const high = {
    title: 'High',
    author: 'Edsger W. Dijkstra',
    likes: 6,
  }

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(high)
  })
})
