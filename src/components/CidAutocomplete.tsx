import React, { useState } from "react";
import { fetchCids } from "@/lib/supabaseCids";
import { Input } from "@/components/ui/input";

interface CidAutocompleteProps {
  value: string;
  onChange: (value: string, cidObj?: any) => void;
}

const CidAutocomplete: React.FC<CidAutocompleteProps> = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    onChange(val);
    if (val.length >= 2) {
      const cids = await fetchCids(val);
      setSuggestions(cids);
      setShow(true);
    } else {
      setSuggestions([]);
      setShow(false);
    }
  }

  function handleSelect(cid: any) {
    onChange(cid.codigo, cid);
    setShow(false);
  }

  return (
    <div style={{ position: "relative" }}>
      <Input value={value} onChange={handleInput} placeholder="Ex: S52.5 ou Fratura" autoComplete="off" />
      {show && suggestions.length > 0 && (
        <ul style={{ position: "absolute", zIndex: 10, background: "#fff", border: "1px solid #ccc", width: "100%", maxHeight: 200, overflowY: "auto" }}>
          {suggestions.map(cid => (
            <li key={cid.id} style={{ padding: 8, cursor: "pointer" }} onClick={() => handleSelect(cid)}>
              <strong>{cid.codigo}</strong> - {cid.descricao}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CidAutocomplete;
