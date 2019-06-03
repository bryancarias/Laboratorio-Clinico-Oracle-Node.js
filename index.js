const webServer = require('./services/web-server')
const database = require('./services/database')
const dbConfig = require('./config/database')
const defaultThreadPoolSize = 4

process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize

async function startup() {
    console.log('Starting application')

    try {
        console.log('Inicializing database module') 
        await database.inicialice();
    } catch (error){
        console.error(error)
        process.exit(1) //Non-zero failure code
    }// end inicializing database module
    try{
        console.log('Inicializing web server module')
        await webServer.inicialize()
    }
    catch (error){
        console.error(error)
        process.exit(1) //Non-zero failure code
    }//End incializing web server module
}

startup()

async function shutdown(e) {
    let err = e
    console.log('Shutting down')
    try {
        console.log('Closing web server module')
        await webServer.close()
    } catch (error) {
        console.log('Encountered error',e)
        err = err || e
    }
    try {
        console.log('Closing database module'); 
        await database.close(); 
    } catch (err) {
        console.log('Encountered error', e);
        err = err || e;
    }
    console.log('Existing process')

    if(err){
        process.exit(1)
    }else{
        process.exit(0)
    }
}

process.on('SIGTERM',() => {
    console.log('Received  SIGTERM')
    shutdown()
})

process.on('SIGINT', () => {
    console.log('Received SIGINT')
    shutdown()
})

process.on('uncaughtException',err => {
    console.log('Uncaught Exception')
    console.error(err)
    shutdown(err)
})

