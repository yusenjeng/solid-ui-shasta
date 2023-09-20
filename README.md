<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-ui-shasta&background=tiles&project=%20" alt="solid-ui-shasta">
</p>

# solid-ui-shasta

**Under development** - A high performance collection of UI components for Solid.js. Designed for seamless integration with a minimalist touch.

**Havn't been released**

## Quick start

Install it:

```bash
npm i solid-ui-shasta
# or
yarn add solid-ui-shasta
# or
pnpm add solid-ui-shasta
```

Use it:

// app.tsx
```tsx
import {
  Button, GlobalStyle
} from "solid-ui-shasta";

import { styled } from "solid-styled-components"; // optional

const App = () => {
  const onClick = () => {};
  return (
    <>
      <GlobalStyle />
      <Button onClick={onClick}>
        Hello
      </Button>
    </>
  );
};

export default App;
```

A minimal [example project](https://github.com/yusenjeng/solid-ui-shasta-example-basic), FYI.

Have fun.