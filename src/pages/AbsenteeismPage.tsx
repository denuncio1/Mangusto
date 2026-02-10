import React, { useEffect, useState } from "react";
import AbsenteeismDashboard from "../components/AbsenteeismDashboard";
import AbsenceRecordForm from "../components/AbsenceRecordForm";

export default function AbsenteeismPage() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!showForm) setRefresh(r => r + 1);
  }, [showForm]);

  return (
    <div>
      {showForm ? (
        <AbsenceRecordForm onRegistered={() => setShowForm(false)} />
      ) : (
        <>
          <AbsenteeismDashboard key={refresh} />
          <div className="flex justify-center mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>
              Registrar Atestado
            </button>
          </div>
        </>
      )}
    </div>
  );
}
