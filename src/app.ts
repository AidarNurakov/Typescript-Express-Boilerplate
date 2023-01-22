import * as express from 'express';
import * as bodyParser from 'body-parser';
import Controller from 'interfaces/controller.interface';
import mongoose from 'mongoose';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.connectToTheDatabase();
        this.iniitializeMiddlewares()
        this.iniitializeControllers(controllers)
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`)
        })
    }

    private iniitializeMiddlewares() {
        this.app.use(bodyParser.json())
    }

    private iniitializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private connectToTheDatabase() {
        const { MONGO_PATH } = process.env;
        mongoose.set('strictQuery', false)
        mongoose.connect(MONGO_PATH);
    }
}

export default App;