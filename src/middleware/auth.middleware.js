const Users = require("../models/users.model");

const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: "academlo" // debe estar en una variable de entorno
    };
    passport.use(
        new JwtStrategy(opts, async (decoded, done) => {
            await Users.findOne({ where: { id: decoded.id } },)
            .then(response => {
                return done(null, decoded)
            })
            .catch(err=> {
                return done(null,null)
            } )
        })
    );
};