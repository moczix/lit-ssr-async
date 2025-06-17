export interface LitWithSSR {
  ssrConnected(): Promise<void>;
}


export function isLitWithSSR(element: any): element is LitWithSSR {
  return typeof element.ssrConnected === 'function'
}