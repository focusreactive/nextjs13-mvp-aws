import BuildInfo from '@/components/BuildInfo/BuildInfo';
import NavLink from '@/components/NavLink/NavLink';
import { api } from '@/utils/api';

export const metadata = {
  title: 'Doubled root dynamic page',
};

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const [post] = await api.post((await params).id);
  const [image] = await api.images();

  return (
    <div>
      <article>
        <BuildInfo />
        <h2>{post.title}</h2>
        <div>ROOT</div>
        <p>{post.body}</p>
        <div className="grid">
          <img src={image} alt="dog" width={400} />
        </div>
        <NavLink href={`/users/${post.userId}`} className={'secondary'}>
          Author Page
        </NavLink>
      </article>
    </div>
  );
};

export default PostPage;

export async function generateStaticParams() {
  const [posts] = await api.posts();

  return posts.slice(0, 10).map((post) => {
    return {
      id: String(post.id),
    };
  });
}
