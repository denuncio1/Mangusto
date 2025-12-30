
import { Factor } from "@/types/questionnaire";

export const questionnaireData: Factor[] = [
  {
    id: "demands",
    title: "DEMANDAS",
    description: "Aspectos relacionados à carga de trabalho, exigências, organização e ambiente de trabalho.",
    questions: [
      { id: "d1", text: "As exigências de trabalho feitas por colegas e supervisores são difíceis de combinar." },
      { id: "d2", text: "Tenho prazos impossíveis de cumprir." },
      { id: "d3", text: "Devo trabalhar muito intensamente." },
      { id: "d4", text: "Eu não faço algumas tarefas porque tenho muita coisa para fazer." },
      { id: "d5", text: "Não tenho possibilidade de fazer pausas suficientes." },
      { id: "d6", text: "Recebo pressão para trabalhar em outro horário." },
      { id: "d7", text: "Tenho que fazer meu trabalho com muita rapidez." },
      { id: "d8", text: "As pausas temporárias são impossíveis de cumprir." },
    ],
  },
  {
    id: "relationships",
    title: "RELACIONAMENTOS",
    description: "Aspectos relacionados à comportamentos interpessoais inaceitáveis, como assédio.",
    questions: [
      { id: "r1", text: "Falam ou se comportam comigo de forma dura." },
      { id: "r2", text: "Existem conflitos entre os colegas." },
      { id: "r3", text: "Sinto que sou perseguido no trabalho." },
      { id: "r4", text: "As relações no trabalho são tensas." },
    ],
  },
  {
    id: "control",
    title: "CONTROLE",
    description: "Possibilidade de opinar sobre mudanças nos processos e controlar o ritmo de trabalho.",
    questions: [
      { id: "c1", text: "Posso decidir quando fazer uma pausa." },
      { id: "c2", text: "Consideram a minha opinião sobre a velocidade do meu trabalho." },
      { id: "c3", text: "Tenho liberdade de escolha de como fazer meu trabalho." },
      { id: "c4", text: "Tenho liberdade de escolha para decidir o que fazer no meu trabalho." },
      { id: "c5", text: "Minhas sugestões são consideradas sobre como fazer meu trabalho." },
      { id: "c6", text: "O meu horário de trabalho pode ser flexível." },
    ],
  },
  {
    id: "managerSupport",
    title: "APOIO DA CHEFIA",
    description: "Apoio por parte dos superiores e os recursos fornecidos para resolver os problemas.",
    questions: [
        { id: "ms1", text: "Recebo informações e suporte que me ajudam no trabalho que eu faço." },
        { id: "ms2", text: "Posso confiar no meu chefe quando eu tiver problemas no trabalho." },
        { id: "ms3", text: "Quando algo no trabalho me perturba ou irrita posso falar com meu chefe." },
        { id: "ms4", text: "Tenho suportado trabalhos emocionalmente exigentes." },
        { id: "ms5", text: "Meu chefe me incentiva no trabalho." },
    ],
  },
  {
    id: "peerSupport",
    title: "APOIO DOS COLEGAS",
    description: "Comunicação interpessoal adequada e respeito às diversidades entre os trabalhadores.",
    questions: [
        { id: "ps1", text: "Quando o trabalho se torna difícil, posso contar com ajuda dos colegas." },
        { id: "ps2", text: "Meus colegas me ajudam e me dão apoio quando eu preciso." },
        { id: "ps3", text: "No trabalho os meus colegas demonstram o respeito que mereço." },
        { id: "ps4", text: "Os colegas estão disponíveis para escutar os meus problemas de trabalho." },
    ],
  },
  {
    id: "role",
    title: "CARGO",
    description: "Transparência nos critérios de promoção na carreira e reconhecimento.",
    questions: [
        { id: "ro1", text: "Tenho clareza sobre o que se espera do meu trabalho." },
        { id: "ro2", text: "Eu sei como fazer o meu trabalho." },
        { id: "ro3", text: "Estão claras as minhas tarefas e responsabilidades." },
        { id: "ro4", text: "Os objetivos e metas do meu setor são claros para mim." },
        { id: "ro5", text: "Eu vejo como o meu trabalho se encaixa nos objetivos da empresa." },
    ],
  },
  {
    id: "change",
    title: "COMUNICAÇÃO E MUDANÇAS",
    description: "Participação dos trabalhadores em mudanças.",
    questions: [
        { id: "ch1", text: "Tenho oportunidades para pedir explicações ao chefe sobre as mudanças no trabalho." },
        { id: "ch2", text: "As pessoas são sempre consultadas sobre as mudanças no trabalho." },
        { id: "ch3", text: "Quando há mudanças, faço o meu trabalho com o mesmo carinho." },
    ],
  }
];
export const fullQuestionnaireData: Factor[] = [
  ...questionnaireData
];
