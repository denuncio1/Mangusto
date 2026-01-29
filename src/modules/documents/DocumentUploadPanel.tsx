import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function DocumentUploadPanel({ onUpload }: { onUpload?: (file: File) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setMessage('');
  }

  async function handleUpload() {
    if (!selectedFile) return;
    setUploading(true);
    setMessage('');
    // Aqui você integraria com Supabase Storage ou outro backend
    setTimeout(() => {
      setUploading(false);
      setMessage('Upload simulado com sucesso!');
      onUpload?.(selectedFile);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1200);
  }

  return (
    <Card className="p-4 mb-6">
      <h3 className="font-bold mb-2">Upload de Documento Legal</h3>
      <div className="flex gap-2 items-center">
        <Input type="file" ref={fileInputRef} onChange={handleFileChange} disabled={uploading} />
        <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
          {uploading ? 'Enviando...' : 'Enviar'}
        </Button>
      </div>
      {message && <div className="text-green-600 mt-2">{message}</div>}
    </Card>
  );
}
