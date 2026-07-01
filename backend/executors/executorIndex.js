import { ConditionExecutor } from "./conditionExecutor.js";
import { GeminiExecutor } from "./geminiExecutor.js";
import { HttpExecutor } from "./httpExecutor.js";
import { ManualExecutor } from "./manualExecutor.js";
import { ResponseExecutor } from "./responseExecutor.js";
import { WebhookExecutor } from "./webhookExecutor.js";


export const executors = {
  manual: ManualExecutor,
  webhook: WebhookExecutor,
  http: HttpExecutor,
  gemini: GeminiExecutor,
  condition: ConditionExecutor,
  response: ResponseExecutor,
};