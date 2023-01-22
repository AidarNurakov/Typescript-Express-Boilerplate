import { cleanEnv, str, port } from 'envalid'

function validateEnv() {
    cleanEnv(process.env, {
        MONGO_PATH: str(),
        PORT: port()
    })
}

export default validateEnv;