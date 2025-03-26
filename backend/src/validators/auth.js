import bcrypt from 'bcryptjs'

// hash the password
export const hassPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

// compare the password
export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}
