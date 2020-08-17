import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Label, Button, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import UiPopup from '../util/UiPopup';

function LikeButton({ post: { id, likeCount, likes } }) {
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]); //if any of these change, recalculate the value

  const [likePost, { error }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      return error;
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button size="tiny" as="div" labelPosition="right" onClick={likePost}>
      <UiPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</UiPopup>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
