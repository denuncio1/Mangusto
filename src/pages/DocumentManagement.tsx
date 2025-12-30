import React from "react";
import DocumentManager from "@/components/DocumentManager";
import { BackToMenuButton } from "@/components/BackToMenuButton";

const DocumentManagement = () => {
  return (
    <div className="space-y-8">
      <BackToMenuButton className="mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Gestão de Documentos Digitais</h1>
      <DocumentManager />
    </div>
  );
};

export default DocumentManagement;