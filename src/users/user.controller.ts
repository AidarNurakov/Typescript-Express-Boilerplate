import UserNotFoundException from "../exceptions/UserNotFoundException";
import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import postModel from "../posts/posts.model";
import userModel from "./user.model";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import authMiddleware from "../middleware/auth.middleware";

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private post = postModel;
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
        this.router.get(`${this.path}/:id/posts`, authMiddleware, this.getAllPostOfUser);
    }

    private getUserById = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const userQuery = this.user.findById(id);
        if (request.query.withPosts === 'true') {
            userQuery.populate('posts').exec();
        }
        const user = await userQuery;
        if (user) {
            response.send(user);
        } else {
            next(new UserNotFoundException(id));
        }
    }

    private getAllPostOfUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        const userId = request.params.id;
        if (userId === request.user._id.toString()) {
            const posts = await this.post.find({ author: userId });
            response.send(posts);
        }
        next(new NotAuthorizedException());
    }
}

export default UserController;