export interface PostModel{
    userId: number;
    id:     number;
    title:  string;
    body:   string;
}

export interface CommentModel{
    postId: number;
    id:     number;
    name:   string;
    email:  string;
    body:   string;
}

export class PostCommentModel{
    userId: number = 0;
    id:     number = 0;
    title:  string = "";
    body:   string = "";
    comments: Array<CommentModel> = [];
}