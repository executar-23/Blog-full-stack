import { createCollectorClient } from './index';

describe('createCollectorClient', () => {
  it('posts a batch with a timestamp to the collector', async () => {
    const fetch = jest.fn().mockResolvedValue({ ok: true, status: 202 });
    const client = createCollectorClient({
      endpoint: 'https://collector.test/v1/events',
      fetch,
      now: () => new Date('2026-09-27T12:00:00.000Z'),
    });
    await client.track({ name: 'page_view', source: 'web', path: '/blog' });
    const [, init] = fetch.mock.calls[0];
    expect(JSON.parse(init.body)).toEqual({
      events: [
        { name: 'page_view', source: 'web', path: '/blog', occurredAt: '2026-09-27T12:00:00.000Z' },
      ],
    });
  });

  it('surfaces collector errors', async () => {
    const fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
    const client = createCollectorClient({ endpoint: 'https://collector.test', fetch });
    await expect(client.track({ name: 'page_view', source: 'web', path: '/' })).rejects.toThrow(
      '500',
    );
  });
});
