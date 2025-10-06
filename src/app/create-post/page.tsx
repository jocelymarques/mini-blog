"use client";
import { useState, useEffect} from "react";
import { db } from "../firebase/config";
import { useRouter } from "next/navigation";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuthValue } from "../context/AuthContext";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false); // Removido pois não é usado
  const [fullArticle, setFullArticle] = useState("");
  const router = useRouter();
  const { user } = useAuthValue();

  useEffect(() => {
    if (!user) {
      router.push("/"); // redireciona se não estiver logado
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        fullArticle,
        createdAt: Timestamp.now(),
        uid: user.uid, // salva o autor do post
      });
      router.push("/");
    } catch {
      alert("Erro ao criar post");
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
        <div className="mb-5">
          <label htmlFor="large-input" className="block mb-2 text-sm font-medium ">Título</label>
          <input type="text" id="large-input" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" />
        </div>
        {/* <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        /> */}
        <div className="mb-5">
          <label htmlFor="large-input" className="block mb-2 text-sm font-medium ">Subtítulo</label>
          <input type="text" id="large-input" placeholder="Subtítulo" value={content} onChange={(e) => setContent(e.target.value)} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" />
        </div>
        {/* <textarea
          placeholder="Subtítulo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
          required
        /> */}

        <label htmlFor="large-input" className="block mb-2 text-sm font-medium ">Artigo Completo</label>
        <textarea id="message" rows={10} onChange={(e) => setFullArticle(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Artigo Completo..."></textarea>

        {/* <textarea
          placeholder="Artigo Completo"
          value={fullArticle}
          onChange={(e) => setFullArticle(e.target.value)}
          className="border p-2 rounded"
          required
          rows={10}
        /> */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Criar Post"}
        </button>
  {/* {success && <span className="text-green-600">Post criado com sucesso!</span>} */}
      </form>
    </main>
  );
};
export default CreatePostPage;