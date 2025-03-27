import mongoose from 'mongoose'


const connectDB = async () => {
    try {
        console.log()
        await mongoose
            .connect(
                `mongodb+srv://meetsuthar2005:meet2005@lspdcluster.pg0zohr.mongodb.net/LSPD`,
            )
            .then(() => {
                console.log('Connected to Database')
            })
            .catch((err) => {
                console.log('Error connecting to Database:', err)
            })
    } catch (err) {
        console.log('Error connecting to Database:', err)
        process.exit(1)
    }
}

export default connectDB
