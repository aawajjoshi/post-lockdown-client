import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Image, Label, Icon, Button } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import UiPopup from "../util/UiPopup";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes, avatar},
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid style={{boxShadow: "-10px -10px 4px rgba(255, 254, 242, 0.25), 10px 10px 4px rgba(206, 188, 179, 0.25)"}}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={avatar}
        />
        
        <Card.Header style={{fontFamily:`'Open Sans', sans-serif`, fontWeight: '400', color: 'gray'}}>@{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`} style={{color: 'rgba(0,0,0,.2)', fontSize: '0.8em'}}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description style={{fontFamily:`'Open Sans', sans-serif`, fontSize: '1.8rem', lineHeight: '1.3'}}>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* Like Button */}

        <LikeButton post={{ id, likes, likeCount }} />

        {/* Comment Button */}
        <UiPopup content="Make a comment">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`} size="tiny">
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </UiPopup>

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
