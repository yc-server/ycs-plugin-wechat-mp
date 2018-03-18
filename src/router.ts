import { Ycs } from '@ycs/core';
import { IDocs } from '@ycs/core/lib/docs';
import { Router } from '@ycs/core/lib/routers';
import { IConfig } from './config';
import { Controller } from './controller';
import Model from './model';

export async function setupRouter(app: Ycs): Promise<Router[]> {
  const config: IConfig = app.config.wechatMp;
  const routers: Router[] = [];
  const controller = new Controller(Model, config);
  routers.push(
    Model.routes(config.endpoint, {
      path: '/',
      methods: ['get'],
      controller: controller.index,
      tags: ['__wechat_mp'],
      summary: '公众号配置测试',
      description: '公众号配置测试',
      consumes: ['text/plain'],
      produces: ['text/plain'],
      parameters: [
        {
          type: 'string',
          name: 'signature',
          in: 'query',
        },
        {
          type: 'string',
          name: 'timestamp',
          in: 'query',
        },
        {
          type: 'string',
          name: 'nonce',
          in: 'query',
        },
        {
          type: 'string',
          name: 'echostr',
          in: 'query',
        },
      ],
      responses: {
        200: {
          description: 'Successful operation',
        },
        '4xx': Model.docSchema.response4xx,
        '5xx': Model.docSchema.response5xx,
      },
    })
  );

  return routers;
}
