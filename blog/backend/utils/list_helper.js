const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  return blogs.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.likes
  }, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  )
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}
