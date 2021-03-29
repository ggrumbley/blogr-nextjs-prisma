import React from 'react';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { useSession } from 'next-auth/client';
import ReactMarkdown from 'react-markdown';

import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { $fetch } from '../../utils';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

const publishPost = async (id: number): Promise<void> => {
  await $fetch.put(`/api/publish/${id}`);
  await Router.push('/');
};

const deletePost = async (id: number): Promise<void> => {
  await $fetch.delete(`/api/post/${id}`);
  await Router.push('/');
};

const Post: React.FC<PostProps> = (props) => {
  const [session, loading] = useSession();

  if (loading) return <div>Authenticating...</div>;

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;

  const validated = userHasValidSession && postBelongsToUser;

  let title = props.title;
  if (!props.published) title = `${title} (Draft)`;

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown source={props.content} />
        {!props.published && validated && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        {validated && <button onClick={() => deletePost(props.id)}>Delete</button>}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
