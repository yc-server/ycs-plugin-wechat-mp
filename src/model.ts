import { IModel, Model, Schema } from '@ycs/core/lib/db';
import { IConfig } from './config';

export default Model({
  name: '__wechat_mp',
  schema: new Schema(),
});

export const WechatMpSession = Model({
  name: '__wechat_mp_session',
  schema: new Schema(
    {
      name: String,
      value: String,
      expiresAt: {
        type: Date,
        default: Date.now,
        expires: 7000,
      },
    },
    { timestamps: {} }
  ),
});
