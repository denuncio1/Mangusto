import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ActionRegistration = () => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [certData, setCertData] = useState<any>(null);

    // Sugere a data do sistema (hoje) para o campo de data
    const today = new Date().toISOString().split('T')[0];
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Coletar dados do formulário
      const form = e.target as HTMLFormElement;
      const nome = (form.elements.namedItem("actionName") as HTMLInputElement)?.value;
      const descricao = (form.elements.namedItem("description") as HTMLInputElement)?.value;
      const data = (form.elements.namedItem("datePerformed") as HTMLInputElement)?.value;
      const tipoTreinamento = (form.elements.namedItem("tipoTreinamento") as HTMLSelectElement)?.value;
      const modalidade = (form.elements.namedItem("modalidade") as HTMLSelectElement)?.value;
      const periodicidade = (form.elements.namedItem("periodicity") as HTMLInputElement)?.value;
      const participantes = (form.elements.namedItem("participants") as HTMLInputElement)?.value;
      const instrutor = (form.elements.namedItem("instrutor") as HTMLInputElement)?.value;
      const local = (form.elements.namedItem("local") as HTMLInputElement)?.value;
      const cargaHoraria = (form.elements.namedItem("cargaHoraria") as HTMLInputElement)?.value;
      const convalidacao = (form.elements.namedItem("convalidacao") as HTMLInputElement)?.checked;
      const convalidacaoInfo = (form.elements.namedItem("convalidacaoInfo") as HTMLInputElement)?.value;
      const conteudo = descricao;
      setCertData({ nome, descricao, data, tipoTreinamento, modalidade, periodicidade, participantes, instrutor, local, cargaHoraria, conteudo, convalidacao, convalidacaoInfo });
      setShowCertificate(true);
      toast.success("Registro de ação de capacitação realizado com sucesso! Certificado gerado.");
      // Lógica para salvar os dados
    };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Registro de Ações de Capacitação e Periodicidade</h1>
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 p-4 rounded mb-4 text-blue-900 dark:text-blue-100 text-sm">
        <b>Orientação Legal (NR-01, item 1.7 e Anexo II):</b><br/>
        - Preencha todos os campos obrigatórios para garantir a validade do certificado.<br/>
        - Registre a modalidade do treinamento (Presencial, EAD, Semipresencial) conforme Anexo II.<br/>
        - Certifique-se de informar corretamente o instrutor/responsável técnico.<br/>
        - Em caso de aproveitamento/convalidação, detalhe os dados do treinamento anterior.<br/>
        - Disponibilize o certificado ao trabalhador e arquive digitalmente.<br/>
        <a href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-01-disposicoes-gerais" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 dark:text-blue-200">Ver texto completo da NR-01</a>
      </div>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Registrar Ação de Capacitação <span className='text-red-600'>*</span></CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="actionName">Nome da Ação <span className='text-red-600'>*</span></Label>
              <Input id="actionName" name="actionName" placeholder="Ex: Treinamento sobre Assédio Moral" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tipoTreinamento">Tipo de Treinamento <span className='text-red-600'>*</span></Label>
              <select id="tipoTreinamento" name="tipoTreinamento" className="input input-bordered w-full" required>
                <option value="">Selecione o tipo</option>
                <option value="inicial">Inicial</option>
                <option value="periodico">Periódico</option>
                <option value="eventual">Eventual</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="modalidade">Modalidade <span className='text-red-600'>*</span></Label>
              <select id="modalidade" name="modalidade" className="input input-bordered w-full" required>
                <option value="">Selecione a modalidade</option>
                <option value="presencial">Presencial</option>
                <option value="ead">EAD</option>
                <option value="semipresencial">Semipresencial</option>
              </select>
              <span className="text-xs text-muted-foreground">(Conforme Anexo II da NR-01: registre a modalidade do treinamento.)</span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição / Conteúdo Programático <span className='text-red-600'>*</span></Label>
              <Textarea id="description" name="description" placeholder="Detalhe o conteúdo e objetivo da ação." required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="datePerformed">Data de Realização <span className='text-red-600'>*</span></Label>
              <Input id="datePerformed" name="datePerformed" type="date" required defaultValue={today} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="periodicity">Periodicidade <span className='text-red-600'>*</span></Label>
              <select id="periodicity" name="periodicity" className="input input-bordered w-full" required>
                <option value="">Selecione a periodicidade</option>
                <option value="anual">Anual</option>
                <option value="semestral">Semestral</option>
                <option value="trimestral">Trimestral</option>
                <option value="mensal">Mensal</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="convalidacao">
                <input type="checkbox" id="convalidacao" name="convalidacao" className="mr-2" />
                Aproveitamento/Convalidação de Treinamento
              </Label>
              <Input id="convalidacaoInfo" name="convalidacaoInfo" placeholder="Informe dados do treinamento aproveitado (empresa, data, etc.)" />
              <span className="text-xs text-muted-foreground">(Preencha se o trabalhador já realizou treinamento válido em outra organização ou função. Exemplo: EAD realizado em empresa anterior.)</span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="participants">Número de Participantes <span className='text-red-600'>*</span></Label>
              <Input id="participants" name="participants" type="number" placeholder="Ex: 50" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instrutor">Nome e Qualificação do Instrutor / Responsável Técnico <span className='text-red-600'>*</span></Label>
              <Input id="instrutor" name="instrutor" placeholder="Ex: Eng. João Silva - CREA 123456" required />
              <span className="text-xs text-muted-foreground">(Obrigatório: conforme NR-01, item 1.7.1.1, informar responsável técnico quando aplicável.)</span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="local">Local de Realização <span className='text-red-600'>*</span></Label>
              <Input id="local" name="local" placeholder="Ex: Auditório, EAD, etc." required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cargaHoraria">Carga Horária (horas) <span className='text-red-600'>*</span></Label>
              <Input id="cargaHoraria" name="cargaHoraria" type="number" min="1" placeholder="Ex: 8" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="attendanceList">Lista de Presença <span className='text-red-600'>*</span></Label>
              <Input id="attendanceList" name="attendanceList" type="file" accept=".pdf,.jpg,.jpeg,.png,.xls,.xlsx,.csv" required />
              <span className="text-xs text-muted-foreground">(Obrigatório: faça upload da lista de presença em PDF, imagem ou planilha. Para EAD, anexe relatório de participação.)</span>
            </div>
            <Button type="submit" className="w-full">Registrar Ação</Button>
            <div className="text-xs text-muted-foreground mt-2"><span className='text-red-600'>*</span> Campos obrigatórios</div>
          </form>
          {showCertificate && certData && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-lg font-bold mb-2 text-green-700">Certificado de Treinamento (NR 1.7.1.1)</h2>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 p-4 rounded mb-4 text-blue-900 dark:text-blue-100 text-xs">
                <b>Este certificado foi gerado conforme os requisitos da NR-01, item 1.7 e Anexo II. Guarde uma cópia digital e disponibilize ao trabalhador.</b>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded shadow text-sm">
                <b>Nome do Treinamento:</b> {certData.nome}<br/>
                <b>Tipo de Treinamento:</b> {certData.tipoTreinamento}<br/>
                <b>Modalidade:</b> {certData.modalidade}<br/>
                <b>Conteúdo Programático:</b> {certData.conteudo}<br/>
                <b>Carga Horária:</b> {certData.cargaHoraria} horas<br/>
                <b>Data:</b> {certData.data}<br/>
                <b>Local:</b> {certData.local}<br/>
                <b>Instrutor/Responsável Técnico:</b> {certData.instrutor}<br/>
                <b>Periodicidade:</b> {certData.periodicidade}<br/>
                <b>Número de Participantes:</b> {certData.participantes}<br/>
                {certData.convalidacao && (
                  <>
                    <b>Aproveitamento/Convalidação:</b> Sim<br/>
                    <b>Dados do Treinamento Aproveitado:</b> {certData.convalidacaoInfo}<br/>
                  </>
                )}
                <b>Assinatura do Trabalhador:</b> ___________________________<br/>
                <b>Assinatura do Responsável Técnico:</b> ___________________________<br/>
              </div>
              <span className="text-xs text-muted-foreground block mt-2">Disponibilize este certificado ao trabalhador e arquive uma cópia digital conforme NR 1.7.1.3.</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionRegistration;