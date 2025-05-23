import BuildInfo from '@/components/BuildInfo/BuildInfo';
import NavLink from '@/components/NavLink/NavLink';
import { api } from '@/utils/api';

export const metadata = {
  title: 'Doubled dynamic page',
};

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const [user] = await api.user((await params).id);
  const [image] = await api.images();
  const site = user.website;

  return (
    <div>
      <article>
        <BuildInfo />
        <h2>{user.name}</h2>
        <div>FIRST</div>
        <p>{user.username}</p>
        <div className="grid">
          <img src={image} alt="dog" width={400} />
        </div>
        {site && <NavLink href={user.website}>Site</NavLink>}
      </article>
    </div>
  );
};

export default PostPage;

export async function generateStaticParams() {
  const [posts] = await api.posts();

  return posts.slice(10, 20).map((post) => {
    return {
      id: String(post.id),
    };
  });
}
