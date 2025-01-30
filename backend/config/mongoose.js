const express = require("express");
const { default: mongoose } = require("mongoose");

const mongoURI ="mongodb+srv://mokshitagaur07:Mok_2002@digitalflakecluster0.0zq9z.mongodb.net/digitalflake?retryWrites=true&w=majority&appName=DigitalflakeCluster0" ;
console.log("uri",mongoURI)


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("mongoDb is connected to the server successfully");
  } catch (error) {
    console.log("issue in connecting db",error)
  }
};

module.exports = connectDB;
