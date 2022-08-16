import dotenv from "dotenv"
dotenv.config()

const config = {
    port: +process.env.PORT || 8000,
    mongodb: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        uri: process.env.MONGODB_URI,
    },
    salt: +process.env.SALT,
    mongo: process.env.MONGO,
}

export default config