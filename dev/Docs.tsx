import { createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'

const Page = styled('div')`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`


const Docs = () => {
  const [name, setName] = createSignal('Docs')
  return <Page>{name()}</Page>
}

export default Docs
