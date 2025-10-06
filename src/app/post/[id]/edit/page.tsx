"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "../../../firebase/config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const EditPostPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const docRef = doc(db, "posts", String(id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title || "");
        setContent(data.content || "");
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const docRef = doc(db, "posts", String(id));
    await deleteDoc(docRef);
    router.push("/"); // Redireciona para home após deletar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const docRef = doc(db, "posts", String(id));
    await updateDoc(docRef, {
      title,
      content,
    });
    router.push(`/post/${id}`);
  };

  if (loading) return <main className="p-4">Carregando...</main>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
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