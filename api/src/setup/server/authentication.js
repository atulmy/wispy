// Authentication middleware
export default async function (request, response, next) {
  // Read auth token form header and decode here
  // and set user info and authenticated flag
  // Eg: user = jwt.verify(request.headers.authentication)

  request.auth = {
    isAuthenticated: true,
    user: {
      name: 'User',
      email: 'user@example.com'
    }
  }

  next()
}
