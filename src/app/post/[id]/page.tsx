"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const ViewPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const docRef = doc(db, "posts", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) return <main className="p-4">Carregando...</main>;
  if (!post) return <main className="p-4">Post não encontrado.</main>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{post.content}</p>
        <span className="text-xs text-gray-500">
          {post.createdAt?.seconds
            ? new Date(post.createdAt.seconds * 1000).toLocaleString()
            : ""}
        </span>
        <div className="flex justify-end mt-4">
          <a
            href={`/post/${post.id}/edit`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300"
          >
            Editar
          </a>
        </div>
      </div>
    </main>
  );
};

export default ViewPostPage;