const { expressjwt } = require("express-jwt");

//middleware que obté el JWT de la capçalera http i si aconsegueix desxifrar-lo ens el guarda a req.payload (disponible a través dels seguents middlewares) i sinó, retorna un error.
const isAuthenticated = expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload",
    getToken: getTokenFromHeaders
});

function getTokenFromHeaders(req) {
    //req.headers
    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const token = req.headers.authorization.split(" ")[1];
        return token;
    }
    return null;

}

module.exports = isAuthenticated;