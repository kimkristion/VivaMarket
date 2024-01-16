const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'supersssQL3ercrrett';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED'
        },
    }),
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { authenticateUser } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = authenticateUser;
        } catch {
            console.log('Invalid Token');
        }

        return req;
    },
    signToken: function ({ email, password, _id }) {
        const payload = ({ email, password, _id });
        return jwt.sign({  authenticateUser: payload }, secret, { expiresIn: expiration })
    }
};