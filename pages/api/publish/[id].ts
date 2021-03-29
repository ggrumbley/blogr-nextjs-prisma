import prisma from '../../../lib/prisma';

const handle = async (req, res) => {
  const postId = req.query.id;

  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: { published: true },
  });

  res.json(post);
};

export default handle;
