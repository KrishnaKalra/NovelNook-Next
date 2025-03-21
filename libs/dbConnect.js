import mongoose from "mongoose";
import React from 'react'

var connectionObject={}
async function dbConnect() {
    if(connectionObject.isConnected){
        console.log("Database already connected");
        return;
    }
    try{
        const db=await mongoose.connect(process.env.MONGODB_URI||'', {})

        connectionObject.isConnected=db.connections[0].readyState

        console.log("DB Connected Successfully;")
    }
    catch(error){
        console.log("Database Connection Failed",error);
        process.exit(1);
    }
}

export default dbConnect;