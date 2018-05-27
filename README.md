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

### 申请测试号
[https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)


### 公众号本地测试
> 需要以下三步。完了后打开微信开发者工具，输入地址 http://wx.midoull.com/你的路径
1. 修改hosts文件
2. nginx反向代理
3. 启动本地服务
4. 内网服务器暴露至公网
5. 配置测试号


##### 修改hosts
在hosts文件中添加以下配置
```
127.0.0.1 wx.midoull.com
::1 wx.midoull.com
``` 

##### nginx反向代理
编辑nginx.conf
```
http {
  # 加入下面内容
  upstream testWebserver {
    server 127.0.0.1:9000;
  }

  server {
    listen 80;
    server_name wx.midoull.com;
    location / {
      proxy_pass http://testWebserver;
      index  index.html index.htm;
    } 
  }
}
```

##### 启动本地服务
```bash
npm run serve
```

##### 内网服务器暴露至公网
> 安装 localtunnel
```bash
npm install -g localtunnel
```
> 启动 localtunnel
```bash
lt --port 9000 --subdomain mysubdomain
```

你的URL为 http://mysubdomain.localtunnel.me

##### 配置测试号
[https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)