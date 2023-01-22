import App from './app'
import PostsController from './posts/posts.controller';
import 'dotenv/config'

const app = new App(
    [
        new PostsController()
    ],
    5000
);

app.listen()