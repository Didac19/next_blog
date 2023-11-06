import PostCard from "./components/PostCard";
import { db } from "./lib/db";

async function getPosts() {
  try {
    const response = await db.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        Tag: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return response;
  } catch (error) {
    console.log(error);

  }
}
export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="py-10 md:w-4/5">
      {posts?.length === 0 ? <p className='text-center text-2xl font-bold'>No posts</p> :
        (<div>
          <h1 className="text-center text-5xl mb-4">Posts: {posts?.length}</h1>
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          )
          )}
        </div>)
      }


    </main>
  );
}
