// Official read-only client for the TAG Lending Group public agent API.
// Public facts only. No rates, pricing or borrower data. Not a commitment to lend.
export const BASE_URL = 'https://api.taglendinggroup.com';

export class TagLendingClient {
  constructor({ baseUrl = BASE_URL, fetchImpl = globalThis.fetch } = {}) {
    this.baseUrl = baseUrl;
    this.fetch = fetchImpl;
    this.token = null;
  }
  async #json(res) {
    const body = await res.json().catch(() => ({}));
    if (!res.ok) { const e = new Error(body?.error?.message || body?.error_description || res.statusText); e.status = res.status; e.body = body; throw e; }
    return body;
  }
  async authenticate() {
    if (this.token) return this.token;
    const reg = await this.#json(await this.fetch(this.baseUrl + '/oauth/register', { method: 'POST', headers: { 'idempotency-key': 'npm-sdk' } }));
    const form = new URLSearchParams({ grant_type: 'client_credentials', client_id: reg.client_id, client_secret: reg.client_secret, scope: 'company:read licensing:read contact:read programs:read' });
    const tok = await this.#json(await this.fetch(this.baseUrl + '/oauth/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: form }));
    this.token = tok.access_token;
    return this.token;
  }
  async #get(path) {
    const token = await this.authenticate();
    return this.#json(await this.fetch(this.baseUrl + path, { headers: { authorization: 'Bearer ' + token, accept: 'application/json' } }));
  }
  company() { return this.#get('/api/v1/company'); }
  licensing() { return this.#get('/api/v1/licensing'); }
  contact() { return this.#get('/api/v1/contact'); }
  programs({ limit, cursor } = {}) {
    const q = new URLSearchParams(); if (limit) q.set('limit', String(limit)); if (cursor) q.set('cursor', cursor);
    return this.#get('/api/v1/programs' + (q.toString() ? '?' + q : ''));
  }
}
export default TagLendingClient;
