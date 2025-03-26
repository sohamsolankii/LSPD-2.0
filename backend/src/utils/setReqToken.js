import jwt from 'jsonwebtoken'

export const setToken = (req, newUser) => {
    const accessToken = jwt.sign(
        {
            user: {
                name: newUser.name,
                email: newUser.email,
                id: newUser._id,
            },
        },
        process.env.ACCESS_TOKEN,
        {expiresIn: '1h'}, // Set a reasonable expiration time
    )

    req.user = {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
    }

    return accessToken
}
