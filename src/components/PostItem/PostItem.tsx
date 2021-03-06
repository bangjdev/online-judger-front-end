import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { PostType } from '../../models';
import ShadowedBox from '../ShadowedBox/ShadowedBox';
import UnderlinedTitle from '../UnderlinedTitle/UnderlinedTitle';
import {LanguageContext} from '../../Global/GlobalStates/GlobalStates';
import './PostItem.scss';
import HtmlContent from '../HtmlContent/HtmlContent';
import { Col } from 'react-bootstrap';

interface PostProps {
    post: PostType
};

const PostItem: React.FC<PostProps> = ({ post }: PostProps) => {
    // console.log(post);
    const language=useContext(LanguageContext);
    return (
        <ShadowedBox>
            <Col>
                <UnderlinedTitle>
                    <Link to={"/posts/" + post.id}>{post.title}</Link>
                </UnderlinedTitle>
                <HtmlContent content={post.content}></HtmlContent>
                <span className="author">
                    {language.dictionary["POST_AUTHOR_BY"]}
                    <Link to={"/users/" + post.author}>
                        {post.author}
                    </Link>
                </span>
            </Col>
        </ShadowedBox>
    )
};

export default PostItem;