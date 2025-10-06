"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const ViewPostPage = () => {
  const { id } = useParams();
  type PostType = {
    id: string;
    title: string;
    subtitle?: string;
    createdAt?: { seconds: number };
    content?: string;
    fullArticle?: string;
  };
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const docRef = doc(db, "posts", String(id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() } as PostType);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) return <main className="p-4">Carregando...</main>;
  if (!post) return <main className="p-4">Post não encontrado.</main>;

  return (
    <main className="flex flex-col items-center p-4 bg-gray-50">
      <article className="max-w-2xl w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-100 dark:border-gray-100 p-8 mt-4">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">{post.title}</h1>
        {post.subtitle && (
          <h2 className="text-xl font-semibold mb-6 text-gray-100">{post.subtitle}</h2>
        )}
        <span className="block mb-6 text-xs text-gray-500">
          {post.createdAt?.seconds
            ? new Date(post.createdAt.seconds * 1000).toLocaleString()
            : ""}
        </span>
        <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-800 mb-8" style={{ whiteSpace: "pre-line" }}>
          {post.content}
        </div>
        <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-800 mb-8" style={{ whiteSpace: "pre-line" }}>
          {post.fullArticle}
        </div>
        <div className="flex justify-end mt-4">
          <a
            href={`/post/${post.id}/edit`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300"
          >
            Editar
          </a>
        </div>
      </article>
    </main>
  );
};

export default ViewPostPage;