import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    console.log(`Database connected ${conn.connection.host}`.cyan)

  } catch (error) {
    console.error(`Error ${error.message}`.red.underline);
    process.exit(1)
  }

}

export default connectDB