import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";

const PsychosocialFocus = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="space-y-8">
      <div className="mb-4">
        <BackToMenuButton />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Foco em Riscos Psicossociais</h1>
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo de Foco em Riscos Psicossociais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg">
                  Os riscos psicossociais envolvem fatores do ambiente de trabalho que podem impactar a saúde mental, emocional e social dos trabalhadores. Aqui você encontra ferramentas, vídeos, materiais e autoavaliações para promover um ambiente saudável e seguro.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cards de fatores psicossociais */}
                  <Card className="bg-blue-50 dark:bg-blue-900/30">
                    <CardHeader>
                      <CardTitle className="text-blue-900 dark:text-blue-200 text-base">Fatores Psicossociais</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc ml-4 text-sm">
                        <li>Demandas de trabalho e pressão</li>
                        <li>Relacionamentos interpessoais</li>
                        <li>Controle e autonomia</li>
                        <li>Apoio da chefia e colegas</li>
                        <li>Reconhecimento e clareza de papel</li>
                        <li>Comunicação e mudanças</li>
                      </ul>
                    </CardContent>
                  </Card>
                  {/* Recursos, materiais e avaliação */}
                  <Card className="bg-green-50 dark:bg-green-900/30">
                    <CardHeader>
                      <CardTitle className="text-green-900 dark:text-green-200 text-base">Recursos e Materiais</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc ml-4 text-sm mb-6">
                        <li><a href="https://www.gov.br/pt-br/servicos/avaliar-os-riscos-psicossociais-no-trabalho" target="_blank" rel="noopener noreferrer" className="underline">Avaliação de Riscos Psicossociais (GOV)</a></li>
                        {/* <li><a href="https://www.youtube.com/watch?v=6QK8g6rQ2nA" target="_blank" rel="noopener noreferrer" className="underline">O que são riscos psicossociais?</a></li> */}
                        {/* <li><a href="https://www.youtube.com/watch?v=QwQwQwQwQwQ" target="_blank" rel="noopener noreferrer" className="underline">Saúde Mental no Trabalho</a></li> */}
                        <li><a href="https://youtu.be/9Nv-TtRUFAs" target="_blank" rel="noopener noreferrer" className="underline">Riscos Psicossociais no Trabalho</a></li>
                        <li><a href="https://youtu.be/ymnhvaccfyw" target="_blank" rel="noopener noreferrer" className="underline">Saúde Mental e Trabalho</a></li>
                        <li><a href="https://youtu.be/XeoIfIz06oc" target="_blank" rel="noopener noreferrer" className="underline">Psicodinâmica do Trabalho</a></li>
                        {/* <li><a href="https://www.ilo.org/brasilia/temas/saude-no-trabalho/lang--pt/index.htm" target="_blank" rel="noopener noreferrer" className="underline">Saúde no Trabalho - OIT</a></li> */}
                        <li>
                          <button
                            type="button"
                            className="underline text-left text-blue-700 hover:text-blue-900 focus:outline-none"
                            onClick={() => setShowForm((prev) => !prev)}
                          >
                            {showForm ? 'Ocultar' : 'Abrir'} Avaliação Psicossocial
                          </button>
                        </li>
                      </ul>
                      {showForm && (
                        <div className="mt-8">
                          <h2 className="text-lg font-semibold mb-2">Autoavaliação Psicossocial</h2>
                          <p className="text-sm text-muted-foreground mb-4">Avalie seu bem-estar psicossocial respondendo ao teste abaixo. As respostas são confidenciais e servem para autoconhecimento e promoção de saúde mental no trabalho.</p>
                          <form className="space-y-4 max-w-xl" onSubmit={e => {e.preventDefault(); alert('Obrigado por realizar sua avaliação!');}}>
                            <div className="space-y-2">
                              <label className="font-medium">1. Você sente que a carga de trabalho é adequada?</label>
                              <select className="w-full border rounded px-2 py-1">
                                <option value="sempre">Sempre</option>
                                <option value="frequente">Frequentemente</option>
                                <option value="as_vezes">Às vezes</option>
                                <option value="raro">Raramente</option>
                                <option value="nunca">Nunca</option>
                              </select>
                            </div>
                            {/* ...existing code... */}
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Enviar Avaliação</button>
                          </form>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
  );
};

export default PsychosocialFocus;