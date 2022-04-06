module.exports = {
  '/users': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New user was created'
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: `{
                  "message": {
                      "name": {
                          "msg": "Name is required",
                          "param": "name",
                          "location": "body"
                      }
                  },
                  "internalCode": "request_error"
              }`,
                internalCode: 'request_error'
              }
            }
          }
        },
        409: {
          description: 'User already exist',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'The user with email: jhon@wolox.com is already registered',
                internalCode: 'user_exist'
              }
            }
          }
        }
      }
    }
  }
};
