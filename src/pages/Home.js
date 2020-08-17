import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Segment, Responsive } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      <Segment.Group style={{ border: 'none', boxShadow: 'none' }}>
        <Responsive as={Segment} {...Responsive.onlyComputer}>
          <Grid columns={3} style={{ background: 'rgba(240, 238, 234, .3)' }}>
            <Grid.Row className="page-title">
              <h1
                style={{
                  fontFamily: `'Proza Libre', sans-serif`,
                  fontSize: 'calc(30px + 1vw)',
                  color: 'teal',
                  marginBottom: '3%',
                }}
              >
                Post lockdown, I ...
              </h1>
            </Grid.Row>
            <Grid.Row>
              {user && (
                <Grid.Column>
                  <PostForm />
                </Grid.Column>
              )}
              {loading ? (
                <div
                  style={{ height: '50vh', width: '100vw' }}
                  className="ui active centered inline loader"
                ></div>
              ) : (
                <Transition.Group>
                  {data.getPosts &&
                    data.getPosts.map((post) => (
                      <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                      </Grid.Column>
                    ))}
                </Transition.Group>
              )}
            </Grid.Row>
          </Grid>
        </Responsive>

        <Responsive as={Segment} {...Responsive.onlyTablet}>
          <Grid columns={2} style={{ background: 'rgba(240, 238, 234, .3)' }}>
            <Grid.Row className="page-title">
              <h1
                style={{
                  fontFamily: `'Proza Libre', sans-serif`,
                  fontSize: 'calc(30px + 1vw)',
                  color: 'teal',
                }}
              >
                Post lockdown, I ...
              </h1>
            </Grid.Row>
            <Grid.Row>
              {user && (
                <Grid.Column>
                  <PostForm />
                </Grid.Column>
              )}
              {loading ? (
                <div
                  style={{ height: '50vh', width: '100vw' }}
                  className="ui active centered inline loader"
                ></div>
              ) : (
                <Transition.Group>
                  {data.getPosts &&
                    data.getPosts.map((post) => (
                      <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                      </Grid.Column>
                    ))}
                </Transition.Group>
              )}
            </Grid.Row>
          </Grid>
        </Responsive>

        <Responsive as={Segment} {...Responsive.onlyMobile}>
          <Grid columns={1} style={{ background: 'rgba(240, 238, 234, .3)' }}>
            <Grid.Row className="page-title">
              <h1
                style={{
                  fontFamily: `'Proza Libre', sans-serif`,
                  fontSize: 'calc(30px + 1vw)',
                  color: 'teal',
                }}
              >
                Post lockdown, I ...
              </h1>
            </Grid.Row>
            <Grid.Row>
              {user && (
                <Grid.Column style={{ marginBottom: '5%' }}>
                  <PostForm />
                </Grid.Column>
              )}
              {loading ? (
                <div
                  style={{ height: '50vh', width: '100vw' }}
                  className="ui active centered inline loader"
                ></div>
              ) : (
                <Transition.Group>
                  {data.getPosts &&
                    data.getPosts.map((post) => (
                      <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                      </Grid.Column>
                    ))}
                </Transition.Group>
              )}
            </Grid.Row>
          </Grid>
        </Responsive>
      </Segment.Group>
    </>
  );
}

export default Home;
