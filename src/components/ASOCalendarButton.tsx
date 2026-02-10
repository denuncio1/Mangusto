import React from "react";

interface ASOCalendarButtonProps {
  date: string;
  time: string;
  title: string;
}

export default function ASOCalendarButton({ date, time, title }: ASOCalendarButtonProps) {
  // Gera um link para adicionar ao Google Calendar
  const start = `${date.replace(/-/g, "") }T${time.replace(":", "") }00Z`;
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${start}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-3 py-1 rounded">
      Adicionar ao calendário
    </a>
  );
}
