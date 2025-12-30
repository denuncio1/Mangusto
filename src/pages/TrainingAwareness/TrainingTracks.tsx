import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TrainingTracks = () => {

  const [showVideos, setShowVideos] = React.useState(false);
  const videoLinks = [
    {
      url: "https://www.youtube.com/embed/Es2vuwA8Quc",
      title: "NR-01 - Disposições Gerais"
    },
    {
      url: "https://www.youtube.com/embed/oO9S82h0rYs",
      title: "NR-01 - Capacitação e Treinamento"
    },
    {
      url: "https://www.youtube.com/embed/0t1YLC53RC0",
      title: "NR-01 - Responsabilidades"
    },
    {
      url: "https://www.youtube.com/embed/msZRR0TwZUM",
      title: "NR-01 - Documentação Obrigatória"
    },
    {
      url: "https://www.youtube.com/embed/sfWFSKJQ7N4",
      title: "NR-01 - Perguntas Frequentes"
    },
    {
      url: "https://www.youtube.com/embed/nbH5U5Yoje8",
      title: "NR-01 - Capacitação e Treinamento (Extra)"
    },
  ];

  const handleAccessTracks = () => {
    setShowVideos(true);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Trilhas de Treinamento e Sensibilização</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Gerenciar Trilhas de Treinamento (NR-1 Item 1.4.1.1)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Acesse e gerencie trilhas de treinamento sobre temas como assédio, violência, diversidade e saúde mental, conforme exigido pela NR-1.
          </p>
          <Button onClick={handleAccessTracks} className="w-full">Acessar Trilhas de Treinamento</Button>
          {showVideos && (
            <div className="mt-6 space-y-6">
              <h2 className="text-lg font-bold">Vídeos de Capacitação NR-01</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoLinks.map((video, idx) => (
                  <div key={idx} className="aspect-video w-full">
                    <iframe
                      width="100%"
                      height="315"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="mt-2 text-sm font-medium text-center">{video.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingTracks;