const passport = require('passport')
const { Strategy: JwtStrategi, ExtractJwt } = require("passport-jwt")
const { User } = require('../models')

passport.use(
    new JwtStrategi(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
            secretOrKey: "secret"
        },
        async (payload, done) =>{
            const user = await User.findByPk(payload.uid)
            done(null, user)
        }
    )
)

module.exports = passport