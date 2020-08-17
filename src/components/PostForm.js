import React from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import { useForm } from '../util/hooks';

function PostForm() {
  const { onChange, onSubmit, values } = useForm(createCallBack, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = '';
    },
    onError(err) {
      return error;
    },
  });

  function createCallBack() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h3 style={{ fontFamily: `'Open Sans', sans-serif`, color: 'teal' }}>
          Create a post:
        </h3>
        <Form.Field>
          <TextArea
            placeholder="Post lockdown, I ..."
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? 1 : 0}
            maxLength="60"
            style={{ resize: 'none', marginBottom: '3.5%' }}
          />
          <Button type="submit" color="linkedin">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      avatar
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
