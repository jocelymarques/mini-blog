"use client";
import { useEffect, useState } from "react";
import { db } from "./firebase/config";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsList = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Todos os Posts </h1>
      {loading ? (
        <span>Carregando...</span>
      ) : posts.length === 0 ? (
        <span>Nenhum post encontrado.</span>
      ) : (
        <ul className="w-full max-w-md">
          {posts.map((post) => (

            <div key={post.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-4">
              <a href="#">
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
              </a>
              <div className="p-5">
                <div>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
                  <span className="text-xs text-gray-500">
                    {post.createdAt?.seconds
                      ? new Date(post.createdAt.seconds * 1000).toLocaleString()
                      : ""}
                  </span>
                </div>
                <div className="flex justify-end">
                  <a href={`/post/${post.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          ))}
        </ul>
      )}
    </main>
  );
};

export default Home;