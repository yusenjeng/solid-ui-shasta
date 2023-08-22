import { render } from 'solid-js/web'
import { enableRootsAutoattach } from '@solid-devtools/debugger'
import App from './App'
import { Router } from "@solidjs/router";

enableRootsAutoattach()

render(() => <Router><App /></Router>, document.getElementById('root')!)
