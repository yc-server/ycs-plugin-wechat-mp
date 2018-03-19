import { Ycs } from '@ycs/core';
import { Boom } from '@ycs/core/lib/errors';
import * as rp from 'request-promise';
import { IConfig } from './config';
import { WechatMpSession } from './model';

export async function createToken(): Promise<string> {
  const app = Ycs.instance;
  const conf = app.config.wechatMp;
  const appId = conf.appId;
  const appKey = conf.appKey;
  const uri = `https://api.weixin.qq.com/cgi-bin/token`;
  const res = await rp({
    uri,
    qs: {
      grant_type: 'client_credential',
      appid: appId,
      secret: appKey,
    },
    json: true,
  });

  if (res.errcode) throw res.errmsg;
  const entity: any = await WechatMpSession.create({
    name: 'access_token',
    value: res.access_token,
  });
  return entity['value'];
}

export async function getToken(): Promise<string> {
  const name = 'access_token';
  const entity: any = await WechatMpSession.findOne({ name }).exec();
  if (entity) {
    return entity['value'];
  } else {
    return await createToken();
  }
}
