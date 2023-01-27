import HttpException from "./HttpException";

class UserNotFoundException extends HttpException {
    constructor(userId: string) {
        super(404, `user #${userId} not found`)
    }
}

export default UserNotFoundException;