import { getStoreMatchPatterns, resolveStoreAdapter } from '@/src/runtime/adapter';
import { Orchestrator } from '@/src/runtime/orchestrator/Orchestrator';

export default defineContentScript({
  matches: getStoreMatchPatterns(),
  runAt: 'document_idle',
  main() {
    const store = resolveStoreAdapter(window.location.hostname);

    if (!store) {
      return;
    }

    const orchestrator = new Orchestrator(store);
    orchestrator.init();
  },
});
