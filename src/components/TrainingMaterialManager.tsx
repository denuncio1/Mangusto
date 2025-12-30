import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";

export default function TrainingMaterialManager({ trainingId }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    if (!trainingId) return;
    setLoading(true);
    supabase
      .from("ead_training_material")
      .select("*")
      .eq("training_id", trainingId)
      .order("uploaded_at", { ascending: false })
      .then(({ data }) => {
        setMaterials(data || []);
        setLoading(false);
      });
  }, [trainingId, uploading]);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file || !trainingId) return;
    setUploading(true);
    const filePath = `ead_material/${trainingId}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from("public").upload(filePath, file);
    if (!uploadError) {
      const { data } = supabase.storage.from("public").getPublicUrl(filePath);
      const url = data.publicUrl;
      await supabase.from("ead_training_material").insert({
        training_id: trainingId,
        nome: file.name,
        url
      });
    }
    setUploading(false);
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Material Didático</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input type="file" ref={fileInputRef} onChange={handleUpload} disabled={uploading} />
            {uploading && <span className="ml-2 text-blue-600">Enviando...</span>}
          </div>
          {loading ? (
            <div>Carregando materiais...</div>
          ) : (
            <ul className="space-y-2">
              {materials.map((m) => (
                <li key={m.id}>
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{m.nome}</a>
                  <span className="ml-2 text-xs text-gray-500">{new Date(m.uploaded_at).toLocaleString()}</span>
                </li>
              ))}
              {materials.length === 0 && <li>Nenhum material enviado.</li>}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
