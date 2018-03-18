import { AuthModel } from '@ycs/core/lib/auth';
import { IContext } from '@ycs/core/lib/context';
import { IModel, Mongoose, paginate } from '@ycs/core/lib/db';
import { Boom, handleError } from '@ycs/core/lib/errors';
import { response } from '@ycs/core/lib/response';
import * as crypto from 'crypto';
import { IConfig } from './config';

export class Controller {
  constructor(private model: IModel, private config: IConfig) { }
  // 公众号配置验证
  public index = async (ctx: IContext) => {
    try {
      const signature = ctx.request.fields.signature;
      const timestamp = ctx.request.fields.timestamp;
      const nonce = ctx.request.fields.nonce;
      const echostr = ctx.request.fields.echostr;

      /*  加密/校验流程如下： */
      // 1. 将token、timestamp、nonce三个参数进行字典序排序
      const str = [this.config.token, timestamp, nonce].sort().join('');

      // 2. 将三个参数字符串拼接成一个字符串进行sha1加密
      const sha1Code = crypto.createHash('sha1');
      const code = sha1Code.update(str, <any>'utf-8').digest('hex');

      // 3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
      if (code !== signature) throw Boom.badRequest();

      response(ctx, 200, echostr);
    } catch (e) {
      console.error(e);
      handleError(ctx, e);
    }
  };
}
