

this library is based on @lit-labs/ssr@3.3.1 
we changed Iterable to AsyncIterable to run async promise when component is created before rendered.



## HOW TO USE IT:

1. on your SSR code replace imports 
    ```import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result';```

TO
```import { renderAsync } from 'lit-ssr-async';
import { collectResultAsync } from 'lit-ssr-async';```


2. On your component please implement `implements LitWithSSR`

3. add your async logic to method :
```  public async ssrConnected(): Promise<void> {
    await this._ssrController.loadOnServer();
  }
  ```

### HOW TO PUBLISH

run `sh build.sh`



import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result';
