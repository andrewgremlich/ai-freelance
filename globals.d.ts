declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Presentation API type definitions
interface PresentationRequest {
  start(): Promise<PresentationConnection>;
  reconnect(id: string): Promise<PresentationConnection>;
  getAvailability(): Promise<PresentationAvailability>;
}

interface PresentationConnection extends EventTarget {
  id: string;
  url: string;
  state: 'connecting' | 'connected' | 'closed' | 'terminated';
  onconnect: ((event: Event) => void) | null;
  onclose: ((event: PresentationConnectionCloseEvent) => void) | null;
  onterminate: ((event: Event) => void) | null;
  onmessage: ((event: MessageEvent) => void) | null;
  send(message: string | ArrayBuffer | ArrayBufferView | Blob): void;
  close(): void;
  terminate(): void;
}

interface PresentationConnectionCloseEvent extends Event {
  reason: 'error' | 'closed' | 'wentaway';
  message: string;
}

interface PresentationReceiver {
  connectionList: Promise<PresentationConnectionList>;
}

interface PresentationConnectionList extends EventTarget {
  connections: readonly PresentationConnection[];
  onconnectionavailable: ((event: PresentationConnectionAvailableEvent) => void) | null;
}

interface PresentationConnectionAvailableEvent extends Event {
  connection: PresentationConnection;
}

interface PresentationAvailability extends EventTarget {
  value: boolean;
  onchange: ((event: Event) => void) | null;
}

declare global {
  interface Navigator {
    presentation?: {
      defaultRequest?: PresentationRequest;
      receiver?: PresentationReceiver;
    };
  }

  interface Window {
    PresentationRequest?: {
      new (urls: string[]): PresentationRequest;
    };
  }
}
