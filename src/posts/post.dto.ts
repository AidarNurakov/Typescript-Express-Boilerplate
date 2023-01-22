import { IsString } from "class-validator";

class CreatePostDto {
    @IsString()
    public author: string;

    @IsString()
    public content: string;

    @IsString()
    title: string;
}

export default CreatePostDto;