import { initApp } from './app.factory';

declare const module: any;

async function bootstrap() {
  const app = await initApp();

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
