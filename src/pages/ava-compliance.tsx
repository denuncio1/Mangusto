import React, { useState } from "react";
import AVAComplianceChecklist from "@/components/AVAComplianceChecklist";
import { Button } from "@/components/ui/button";

export default function AVACompliancePage() {
  const [saved, setSaved] = useState(null);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Conformidade Tecnológica do AVA</h1>
      <p className="mb-4">Checklist para comprovação de atendimento ao item 5.1 do Anexo II da NR-01.</p>
      {!saved ? (
        <AVAComplianceChecklist onSave={setSaved} />
      ) : (
        <div className="border rounded p-4 bg-green-50">
          <h2 className="font-bold mb-2">Checklist salvo!</h2>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">{JSON.stringify(saved, null, 2)}</pre>
          <Button className="mt-2" onClick={() => setSaved(null)}>Novo Checklist</Button>
        </div>
      )}
    </div>
  );
}
