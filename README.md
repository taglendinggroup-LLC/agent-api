# @tag-lending-group/agent-api

Official read-only SDK and CLI for the **TAG Lending Group** public agent API.

TAG Lending Group LLC (NMLS #2329372) is a wholesale and non-delegated correspondent mortgage lender in Miami, FL. This package returns public facts only: company info, licensed states, contact details and loan program page links. **No rates, pricing or borrower data.** Nothing here is a commitment to lend. Equal Housing Lender.

## CLI

```
npx @tag-lending-group/agent-api company
npx @tag-lending-group/agent-api licensing
npx @tag-lending-group/agent-api contact
npx @tag-lending-group/agent-api programs
```

## SDK

```js
import { TagLendingClient } from '@tag-lending-group/agent-api';
const tag = new TagLendingClient();
console.log(await tag.licensing());
```

Auth is automatic: the client registers an anonymous client and gets an OAuth 2.0 client-credentials token.

## Links

- Developer docs: https://taglendinggroup.com/developers
- OpenAPI: https://api.taglendinggroup.com/openapi.json
- MCP server: https://api.taglendinggroup.com/mcp (MCP Registry: com.taglendinggroup/agent-api)

TAG is a lender in FL, SC, TN, TX, GA, MI, NM and OH, and a mortgage broker only in CT, PA and NJ.
