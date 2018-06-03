import { Middleware } from 'koa';

type Props = { devMode: boolean };

const reportErrors = ({ devMode = false }: Props): Middleware => async (
  ctx,
  next,
) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    if (devMode) {
      ctx.body = err.message;
    }
    ctx.app.emit('error', err, ctx);
  }
};

export default reportErrors;
