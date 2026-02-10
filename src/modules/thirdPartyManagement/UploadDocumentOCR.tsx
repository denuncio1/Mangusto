
import React, { useState } from 'react';
import { uploadDocumento, validarDocumentoOCR } from './api';

const UploadDocumentOCR = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setStatus("Enviando documento...");
    // Simulação: upload e validação
    const fakeDocumentoId = "doc123";
    await uploadDocumento("terceiroId", { tipo: 'ASO', arquivoUrl: file.name });
    setStatus("Validando documento via IA (OCR)...");
    const result = await validarDocumentoOCR(fakeDocumentoId);
    setOcrResult(result || { resultado: 'valido', nome: 'Teste', cpf: '000.000.000-00' });
    setStatus("Validação concluída.");
    setLoading(false);
  };

  return (
    <div>
      <h1>Upload de Documentos com IA (OCR)</h1>
      <input type="file" accept="application/pdf,image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading} style={{ marginLeft: 8 }}>
        {loading ? "Processando..." : "Enviar e Validar"}
      </button>
      <div style={{ marginTop: 16 }}>
        {status && <p>{status}</p>}
        {ocrResult && (
          <div>
            <h3>Resultado OCR:</h3>
            <pre>{JSON.stringify(ocrResult, null, 2)}</pre>
            <p>Status: <b>{ocrResult.resultado}</b></p>
            {ocrResult.resultado === 'suspeito' && <span style={{ color: 'red' }}>Documento suspeito ou fraudado!</span>}
            {ocrResult.resultado === 'vencido' && <span style={{ color: 'orange' }}>Documento vencido!</span>}
            {ocrResult.resultado === 'valido' && <span style={{ color: 'green' }}>Documento válido!</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDocumentOCR;
