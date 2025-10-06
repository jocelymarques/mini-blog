"use client";
import { useState } from "react";
import { db } from "../firebase/config";
import { useRouter } from "next/navigation";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
    const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: Timestamp.now(),
      });
      router.push("/");
      alert("Post criado com sucesso!");
      setSuccess(true);
      setTitle("");
      setContent("");
    } catch (error) {
      alert("Erro ao criar post");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Post</h1>
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
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Criar Post"}
        </button>
        {success && <span className="text-green-600">Post criado com sucesso!</span>}
      </form>
    </main>
  );
};
export default CreatePostPage;