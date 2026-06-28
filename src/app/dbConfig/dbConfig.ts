import { log } from "console";
import mongoose, { mongo } from "mongoose";

 export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log('Mongo DB connected');
        })
        connection.on('error',(error)=>{
            console.log('Mongo Db connection error,make sure db is up and running:'+error);
            process.exit()
            
        })
    } catch (error) {
        console.log("Some thing went wrong in connecting to db");
        console.log(error)
    }
 }