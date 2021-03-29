import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

const handle = async (req, res) => {
  const { title, content } = req.body;

  const session = await getSession({ req });

  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
};

export default handle;
