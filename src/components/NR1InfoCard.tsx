import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NR1InfoCard = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Obrigação NR-1: Avaliações Psicossociais</CardTitle>
        <CardDescription className="text-muted-foreground">
          Informações essenciais sobre a Norma Regulamentadora nº 1 e o gerenciamento de riscos psicossociais.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          As empresas brasileiras são obrigadas a incluir a avaliação de riscos psicossociais em seus Programas de Gerenciamento de Riscos (PGR) a partir de <span className="font-semibold text-primary">26 de maio de 2025</span>. A exigência de "prestar contas" formalmente (através de inventário e plano de ação) também se inicia nesta data.
        </p>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-sm">Base Legal:</span>
          <Badge variant="secondary" className="text-xs">NR-1 (Portaria MTE nº 1.419/2024)</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Esta aplicação visa auxiliar na organização e apresentação da documentação necessária para comprovar a identificação e o gerenciamento dos riscos psicossociais.
        </p>
      </CardContent>
    </Card>
  );
};

export default NR1InfoCard;