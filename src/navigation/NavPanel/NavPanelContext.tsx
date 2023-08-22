import { Accessor, Setter, createContext } from 'solid-js';

interface NavPanelContextProps {
  activeLink: Accessor<string>;
  setActiveLink: Setter<string>;
}

const NavPanelContext = createContext<NavPanelContextProps>();

export default NavPanelContext;
