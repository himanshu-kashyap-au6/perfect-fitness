const mongoose = require('mongoose')
const mongodbMemoryServer = require('mongodb-memory-server')
const mongod = new mongodbMemoryServer.MongoMemoryServer()
const { MONGODB_URI, MONGODB_PASSWORD } = process.env

function connectDB(mongoDBURI){
    return mongoose.connect(mongoDBURI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}

module.exports = {
    connect: function(){
        return new Promise(function(resolve, reject){            
            if(process.env.NODE_ENV === 'test'){
                mongod.getUri().then(function(uri){
                    connectDB(uri)
                    .then(function(){
                        resolve('Test DataBase Connected Successfully...!!!')
                    })
                    .catch(function(err){
                        reject(err.message)
                    })
                })
            }else{
                connectDB(MONGODB_URI.replace('<password>', MONGODB_PASSWORD))
                .then(function(){
                    resolve('ATLAS DataBase Connected Successfully...!!!')
                })
                .catch(function(err){
                    reject(err.message)
                })
            }
        })
    },
    disconnect: function(){
        if(process.env.NODE_ENV === 'test') return mongod.stop()
         return mongoose.disconnect()
    }
}

