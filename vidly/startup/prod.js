import helmet from "helmet";
import compression from "compression";

export function prod(app) {
  app.use(helmet());
  app.use(compression());
}
