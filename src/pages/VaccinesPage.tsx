import React, { useState } from "react";
import VaccineDashboard from "../components/VaccineDashboard";
import VaccineRecordForm from "../components/VaccineRecordForm";
import VaccineScheduleForm from "../components/VaccineScheduleForm";
import CampaignsList from "../components/CampaignsList";

export default function VaccinesPage() {
  const [showForm, setShowForm] = useState<null | 'registro' | 'agendamento'>(null);
  const [refresh, setRefresh] = useState(0);

  React.useEffect(() => {
    if (!showForm) setRefresh(r => r + 1);
  }, [showForm]);

  return (
    <div>
      {showForm === 'registro' ? (
        <VaccineRecordForm onRegistered={() => setShowForm(null)} />
      ) : showForm === 'agendamento' ? (
        <VaccineScheduleForm onScheduled={() => setShowForm(null)} />
      ) : (
        <>
          <VaccineDashboard key={refresh} />
          <div className="flex justify-center gap-4 mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowForm('registro')}>
              Registrar Vacina
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowForm('agendamento')}>
              Agendar Dose Pendente
            </button>
          </div>
          <CampaignsList />
        </>
      )}
    </div>
  );
}
