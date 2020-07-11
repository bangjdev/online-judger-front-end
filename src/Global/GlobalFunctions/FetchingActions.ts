import { ResponseDataType, PostType, ProblemType, TokenType, UserType, FormDataType, StringIndexed, CommentType, SubmissionType, SubmissionFormDataType } from '../../models';
import APIFetcher from '../SpecialClasses/APIFetcher';

const API_PATH = {
    posts: "announcements/",
    problems: "problems/",
    submissions: "submissions/",
    tokens: "tokens/",
    users: "users/"
};

enum LoadState {
    LOADING=0,
    NOTLOADING
}

const fetchPosts = async (
    fetcher: APIFetcher,
    page: number,
    limit: number,
    callback: (posts: ResponseDataType<Array<PostType>>) => void,
    errorHandle: (error: Error) => void
) => {
    fetcher.doFetch<ResponseDataType<Array<PostType>>>(
        'get',
        API_PATH.posts,
        { p: page, limit: limit },
        callback,
        errorHandle);
};

const fetchSinglePost = async (
    fetcher: APIFetcher,
    postID: string,
    callback: (posts: ResponseDataType<PostType>) => void,
    errorHandle: (error: Error) => void
) => {
    fetcher.doFetch<ResponseDataType<PostType>>(
        'get',
        API_PATH.posts + postID,
        {},
        callback,
        errorHandle);
};

const fetchProblems = async (
    fetcher: APIFetcher,
    callback: (problems: ResponseDataType<Array<ProblemType>>) => void,
    errorHandle: (error: Error) => void
) => {
    fetcher.doFetch<ResponseDataType<Array<ProblemType>>>(
        'get',
        API_PATH.problems,
        {},
        callback,
        errorHandle);
};

const fetchSingleProblem = async (
    fetcher: APIFetcher,
    problemID: string,
    callback: (problem: ResponseDataType<ProblemType>) => void,
    errorHandle: (error: Error) => void
) => {
    fetcher.doFetch<ResponseDataType<ProblemType>>(
        'get',
        API_PATH.problems + problemID,
        {},
        callback,
        errorHandle);
};
const fetchComments = async(
    fetcher: APIFetcher,
    postsID: string,
    callback: (problem: ResponseDataType<Array<CommentType>>) => void,
    errorHandle: (error: Error) => void
) => {
    //fetcher.doSomethingStupid
    callback({
        results:[
        {id:"abc",author:"bangngu",post:"123",content:"This is test cmt",time:""},
        {id:"abc",author:"bangngu",post:"123",content:"This is test cmt",time:""},
        {id:"abc",author:"bangngu",post:"123",content:"This is test cmt",time:""},
        {id:"abc",author:"bangngu",post:"123",content:"This is test cmt",time:""},
        {id:"abc",author:"bangngu",post:"123",content:"This is test cmt",time:""},
        {id:"abc",author:"bangngu",post:"123",content:"This is test cmt",time:""},
        {id:"abc",author:"bangngu",post:"123",content:"This is test cmt 2",time:""}
    ]});
}
const doLogin = async (
    fetcher: APIFetcher,
    username: string,
    password: string,
    callback: (token: ResponseDataType<TokenType>)=> void,
    errorHandle: (error: Error) => void
) => {
    fetcher.doFetch(
        'post',
        API_PATH.tokens,
        {},
        callback,
        errorHandle,
        {username: username, password: password}
    );    
};

const doLogout = async (
    fetcher: APIFetcher,
    token: string,
    callback: (token: ResponseDataType<{}>) => void,
    errorHandle: (error: Error) => void
) => {
    fetcher.doFetch(
        'delete',
        API_PATH.tokens + token,
        {},
        callback,
        errorHandle
    );    
};

const doSignUp = async (
    fetcher: APIFetcher,
    formData: StringIndexed<FormDataType>,
    callback: (reponse: ResponseDataType<{}>)=> void,
    errorHandle: (error: Error) => void
) => {
    fetcher.doFetch(
        'post',
        API_PATH.users,
        {},
        callback,
        errorHandle,
        {
            username: formData.username,
            email: formData.email,
            password1: formData.password1,
            password2: formData.password2,
            first_name: formData.first_name,
            last_name: formData.last_name,
        }
    );    
};

const doSubmit = async (
    fetcher: APIFetcher,
    formData: StringIndexed<SubmissionFormDataType>,
    callback: (token: ResponseDataType<{}>)=> void,
    errorHandle: (error: Error) => void
) => {
    fetcher.doFetch(
        'post',
        API_PATH.submissions,
        {},
        callback,
        errorHandle,
        {
            language: formData.language,
            author: formData.author,
            source_code: formData.source_code,
            problem: formData.problem
        }
    );    
};

const fetchUser = async (
    fetcher: APIFetcher,
    username: string,
    callback: (me: ResponseDataType<UserType>) => void,
    errorHandle: (error: Error) => void
) => {
    fetcher.doFetch(
        'get',
        API_PATH.users + username,
        {},
        callback,
        errorHandle
    );
};

const fetchSubmissions = async(
    fetcher: APIFetcher,
    callback: (submission: ResponseDataType<Array<SubmissionType>>)=>void,
    errorHandle:(error: Error) => void
) => {
    fetcher.doFetch(
        'get',
        API_PATH.submissions,
        {},
        callback,
        errorHandle
    );
}
export { fetchPosts, fetchSinglePost };
export { fetchProblems, fetchSingleProblem }
export { fetchUser, doLogin, doLogout, doSignUp, doSubmit };
export { fetchComments };
export { fetchSubmissions};
export { LoadState };