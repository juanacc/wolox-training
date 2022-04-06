module.exports = {
  email: {
    type: 'string',
    example: 'jhon.smith@wolox.com'
  },
  name: {
    type: 'string',
    example: 'Jhon'
  },
  lasName: {
    type: 'string',
    example: 'Smith'
  },
  password: {
    type: 'string',
    example: 'abc45678'
  },
  User: {
    type: 'object',
    properties: {
      email: {
        $ref: '#/components/schemas/email'
      },
      name: {
        $ref: '#/components/schemas/name'
      },
      lasName: {
        $ref: '#/components/schemas/lasName'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  }
};
