export interface UserType {
    username:string,
    first_name:string,
    last_name:string,
    email:string,
    is_staff:boolean,
    date_joined:string
}

export interface PostType {
    id:string,
    title:string,    
    content:string,
    author:string,
    time:string,
    last_edited:string
}

export interface CommentType{
    id:string,
    author:string,//author id
    post:string,//post id
    content:string,
    time:string
}
export interface ProblemType{
    id:string,
    problem_code:string,
    title:string,
    author: string,    
    difficulty: string,
    tags: string[],
    description: string,
    percent: number
}

export interface TokenType {
    token: string;
}

export interface ResponseDataType<T extends {}> {
    count?: number,
    next?: string,
    previous?: string,
    message_code?: string,
    results: T
}

export interface FormDataType {
    username: string,
    email: string,
    password1: string,
    password2: string,
    first_name: string,
    last_name: string
}

export interface SubmissionFormDataType {
    language: string,
    author: string,
    source_code: string,
    problem: string
}

export interface SubmissionType{
    id: string,
    author: string,
    source_code?: string,
    problem: string,
    status: string,
    result: string,
    test_counts: number,
    time: string
}
export type StringIndexed<T> = {
    [index: string]: string
};