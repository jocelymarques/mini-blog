"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "../../../firebase/config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuthValue } from "../../../context/AuthContext";

const EditPostPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fullArticle, setFullArticle] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuthValue(); // adicione esta linha
  const [isOwner, setIsOwner] = useState(false); // adicione esta linha

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const docRef = doc(db, "posts", String(id));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title || "");
        setContent(data.content || "");
        setFullArticle(data.fullArticle || "");
        if (user && data.uid === user.uid) { 
          setIsOwner(true);
        }
      }
      setLoading(false);
    };
    fetchPost();
  }, [id, user]);

  useEffect(() => {
    if (!loading && !isOwner) {
      router.push("/");
    }
  }, [loading, isOwner, router]);

  const handleDelete = async () => {
    if (!id) return;
    const docRef = doc(db, "posts", String(id));
    await deleteDoc(docRef);
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const docRef = doc(db, "posts", String(id));
    await updateDoc(docRef, {
      title,
      content,
      fullArticle,
    });
    router.push(`/post/${id}`);
  };

  if (loading) return <main className="p-4">Carregando...</main>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
        <div className="mb-5">
          <label htmlFor="edit-title" className="block mb-2 text-sm font-medium">Título</label>
          <input
            type="text"
            id="edit-title"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="edit-content" className="block mb-2 text-sm font-medium">Subtítulo</label>
          <input
            type="text"
            id="edit-content"
            placeholder="Subtítulo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <label htmlFor="edit-fullArticle" className="block mb-2 text-sm font-medium">Artigo Completo</label>
        <textarea
          id="edit-fullArticle"
          rows={10}
          value={fullArticle}
          onChange={(e) => setFullArticle(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Artigo Completo..."
          required
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        >
          Salvar alterações
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-2"
        >
          Deletar post
        </button>
      </form>
    </main>
  );
};

export default EditPostPage;