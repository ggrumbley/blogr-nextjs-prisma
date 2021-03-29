import prisma from '../../../lib/prisma';

const handle = async (req, res) => {
  if (req.method !== 'DELETE') {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }

  const postId = req.query.id;
  const post = await prisma.post.delete({
    where: { id: Number(postId) },
  });

  res.json(post);
};

export default handle;
