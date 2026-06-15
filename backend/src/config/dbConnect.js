import mongoose from 'mongoose'

const dbConnect = async () => {
    try {
        const connInstance = await mongoose.connect(
            `${process.env.MONGO_URI}/chatApp`
        );
        console.log(`MongoDB connected || DB HOST: ${connInstance.connection.host}`);
    } catch (error) {
        console.log("Error:", error);
        process.exit(1);
    }
};

export default dbConnect;