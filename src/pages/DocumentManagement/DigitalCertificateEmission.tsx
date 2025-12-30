import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { logDocumentAction, fetchDocumentLogs } from "@/lib/documentLogs";

const DigitalCertificateEmission = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = React.useState<any[]>([]);
  const [logs, setLogs] = React.useState<any[]>([]);
  const [publicView, setPublicView] = React.useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Apenas PDF (ICP-Brasil)
      const validFiles = Array.from(files).filter(file => file.type === "application/pdf");
      if (validFiles.length !== files.length) {
        toast.error("Só é permitido enviar arquivos PDF assinados digitalmente (ICP-Brasil). Consulte o responsável pelo SST.");
        return;
      }
      setUploadedFiles(prev => [...prev, ...validFiles]);
      for (const file of validFiles) {
        await logDocumentAction({ action: "upload", file: file.name, user: "admin" });
      }
      toast.success("Documento PDF enviado com sucesso! Lembre-se: só são aceitos documentos assinados digitalmente conforme ICP-Brasil.");
      fetchLogs();
    }
  };

  const handleConsulta = async () => {
    for (const file of uploadedFiles) {
      await logDocumentAction({ action: "consulta", file: file.name, user: "admin" });
    }
    toast.info("Consulta de documentos registrada no log de rastreabilidade.");
    fetchLogs();
  };

  const fetchLogs = async () => {
    const data = await fetchDocumentLogs();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Emissão e Armazenamento de Documentos</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Gerenciar Documentos Assinados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Faça upload de documentos <b>PDF assinados digitalmente</b> por outras plataformas (<b>ICP-Brasil</b>) e armazene-os de forma segura.<br/>
            <span className="text-xs text-gray-500">Mantenha os originais conforme legislação. O sistema registra logs de upload e acesso para garantir rastreabilidade e validade jurídica.</span>
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button onClick={handleUploadClick} className="w-full sm:w-auto">Upload de Documento Assinado</Button>
            <Button variant="outline" onClick={handleConsulta} className="w-full sm:w-auto">Consultar Documentos</Button>
            <Button variant="secondary" onClick={() => setPublicView(v => !v)} className="w-full sm:w-auto">
              {publicView ? "Fechar Acesso Público" : "Acesso Público (Inspeção/Trabalhador)"}
            </Button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xml"
            multiple
          />
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h2 className="text-base font-semibold mb-2">Documentos enviados nesta sessão:</h2>
              <ul className="list-disc pl-5">
                {uploadedFiles.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          {logs.length > 0 && (
            <div className="mt-6">
              <h2 className="text-base font-semibold mb-2">Rastreabilidade (Logs de Upload e Consulta):</h2>
              <table className="min-w-full border text-xs">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-2 py-1 border">Ação</th>
                    <th className="px-2 py-1 border">Documento</th>
                    <th className="px-2 py-1 border">Usuário</th>
                    <th className="px-2 py-1 border">Data/Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, idx) => (
                    <tr key={idx}>
                      <td className="border px-2 py-1">{log.action}</td>
                      <td className="border px-2 py-1">{log.file}</td>
                      <td className="border px-2 py-1">{log.user}</td>
                      <td className="border px-2 py-1">{new Date(log.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {publicView && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-lg font-bold mb-2 text-blue-700">Acesso Público: Consulta de Documentos e Logs</h2>
              <p className="text-xs text-gray-500 mb-2">Este painel garante acesso amplo à Inspeção do Trabalho e aos trabalhadores/representantes, conforme NR 1.6.5.</p>
              <table className="min-w-full border text-xs">
                <thead>
                  <tr className="bg-blue-100 dark:bg-blue-900">
                    <th className="px-2 py-1 border">Ação</th>
                    <th className="px-2 py-1 border">Documento</th>
                    <th className="px-2 py-1 border">Usuário</th>
                    <th className="px-2 py-1 border">Data/Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, idx) => (
                    <tr key={idx}>
                      <td className="border px-2 py-1">{log.action}</td>
                      <td className="border px-2 py-1">{log.file}</td>
                      <td className="border px-2 py-1">{log.user}</td>
                      <td className="border px-2 py-1">{new Date(log.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalCertificateEmission;