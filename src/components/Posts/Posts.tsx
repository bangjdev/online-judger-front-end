import React, { useState, useEffect, useContext } from 'react';
import { ResponseDataType, PostType } from '../../models';
import PostItem from '../PostItem/PostItem';
import Paginator from '../Paginator/Paginator';
import { FetchContext, LoadState } from '../../contexts/GlobalFunctions/FetchingFunctions';
import LoadingPlaceholder from '../LoadingPlaceholder/LoadingPlaceholder';
const initialPosts: ResponseDataType<Array<PostType>> = {
    count: 0,
    previous: "",
    next: "",
    results: []
};

const Posts: React.FC = () => {
    const postsPerPage : number = 5;
    const [postsData, setPostsData] = useState(initialPosts);
    const [page, setPage] = useState(1);
    const [loadState, setLoadState]= useState(LoadState.NOTLOADED);
    const { fetcher } = useContext(FetchContext);
    
    useEffect(()=>{
        setLoadState(LoadState.NOTLOADED);
    }, [page]);//Request for a fetch
    useEffect(() => {
        let tid: ReturnType < typeof setTimeout > ;
        if (loadState === LoadState.NOTLOADED){
            setLoadState(LoadState.LOADING);
            fetcher.fetchPosts(page, (posts: ResponseDataType<Array<PostType>>) => {
                setPostsData(posts);            
                setLoadState(LoadState.LOADED);
            }, (error: Error) => {
                console.log(error);
                setPostsData(initialPosts);
                setLoadState(LoadState.LOADED);
                //tid = setTimeout(()=>setLoadState(LoadState.NOTLOADED)); //Uncomment if want to have infinite fetching
            }); 
        };
        return ()=>{
            clearTimeout(tid);
        }
    }, [fetcher, loadState, page]);//Fetch data
    // Stateless procedure
    let totalPages: number=(postsData.count)?(Math.ceil(postsData.count/postsPerPage)):0;
    if (loadState === LoadState.LOADING) 
        return (<LoadingPlaceholder/>)
    else
        return (
            <div>
                {postsData.results.map((post, idx) => {
                    return (
                        <PostItem post={post} key={idx} />
                    )
                })}
                <Paginator id="posts" page={page} setPage={(page:number)=>{setPage(page);window.scrollTo(0,0);}} totalPages={totalPages}></Paginator>
            </div>
        )
};

export default Posts;