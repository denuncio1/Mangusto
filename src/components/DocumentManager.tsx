import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: string;
  name: string;
  url: string;
}

const initialDocuments: Document[] = [
  { id: "doc1", name: "Ferramenta HSE IT.docx", url: "/src/documents/Ferramenta HSE IT.docx" },
  { id: "doc2", name: "NR 1 projeto.docx", url: "/src/documents/NR 1 projeto.docx" },
  { id: "doc3", name: "nr-01-atualizada-2025-i-1.pdf", url: "/src/documents/nr-01-atualizada-2025-i-1.pdf" },
  { id: "doc4", name: "Portaria MTE nº 1.419 (NR-01 GRO - nova redação) (1).pdf", url: "/src/documents/Portaria MTE nº 1.419 (NR-01 GRO - nova redação) (1).pdf" },
  { id: "doc5", name: "Portaria MTE nº 765 (Prorroga início de vigência Cap. 1.5 da NR-01).pdf", url: "/src/documents/Portaria MTE nº 765 (Prorroga início de vigência Cap. 1.5 da NR-01).pdf" },
];

const DocumentManager = () => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [newFileName, setNewFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setNewFileName(file.name);
      // In a real application, you would upload the file to a server
      // and get a URL. Here, we'll simulate it.
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        name: file.name,
        url: URL.createObjectURL(file), // Temporary URL for display
      };
      setDocuments((prevDocs) => [...prevDocs, newDoc]);
      toast.success(`Documento "${file.name}" adicionado.`);
      setNewFileName("");
      event.target.value = ""; // Clear the input
    }
  };

  const handleDeleteDocument = (id: string, name: string) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    toast.info(`Documento "${name}" removido.`);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Gerenciamento de Documentos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="document-upload">Adicionar Novo Documento</Label>
          <div className="flex space-x-2">
            <Input
              id="document-upload"
              type="file"
              onChange={handleFileChange}
              className="flex-grow"
            />
            <Button type="button" onClick={() => document.getElementById("document-upload")?.click()} className="shrink-0">
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Documentos Anexados:</h3>
          {documents.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum documento anexado ainda.</p>
          ) : (
            <ul className="space-y-2">
              {documents.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between p-2 border rounded-md bg-secondary/20">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {doc.name}
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteDocument(doc.id, doc.name)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentManager;