# Installation

```bash
ycs add plugin wechat-mp
```

# configurations

```ts
import { IConfig } from 'ycs-plugin-wechat-mp';

export const development: IConfig = {
  endpoint: '/wechat/mp',
  appId: 'xxx',
  appSecret: 'xxx',
  token: 'xxx',
};

export const production: IConfig = {
  endpoint: '/wechat/mp',
  appId: 'xxx',
  appSecret: 'xxx',
  token: 'xxx',
};

```