declare module 'react-to-print' {
  import * as React from 'react';

  export interface UseReactToPrintOptions {
    content: () => React.ReactInstance | Element | null;
    documentTitle?: string;
    onAfterPrint?: () => void;
    onBeforePrint?: () => void;
    onPrintError?: (errorLocation: string, error: Error) => void;
    removeAfterPrint?: boolean;
    copyStyles?: boolean;
    pageStyle?: string;
    bodyClass?: string;
    suppressErrors?: boolean;
    print?: (target: HTMLIFrameElement) => void;
  }

  export function useReactToPrint(options: UseReactToPrintOptions): (() => void) | undefined;
}

export {};
