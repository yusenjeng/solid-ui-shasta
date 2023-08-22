import { createSignal, onCleanup } from 'solid-js';
import { styled } from 'solid-styled-components';

// Define the styled component with styled-components
const Grid = styled('div')`
  display: grid;
  grid-gap: 2em;
  background-color: #FAFAFA;
  color: #333;
  padding: 2em;
  border-radius: 0.5em;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

// Define the interface for the props
interface TemplateGridProps {
  templateAreas: string
  templateColumns?: string
  templateRows?: string
  backgroundColor?: string
  children: any // Change this to a more specific type depending on your use case
}

// The actual component
export const TemplateGrid = (props: TemplateGridProps) => {
  const [getTemplateAreas, setTemplateAreas] = createSignal(props.templateAreas);
  const [getTemplateColumns, setTemplateColumns] = createSignal(props.templateColumns || '1fr');
  const [getTemplateRows, setTemplateRows] = createSignal(props.templateRows || '1fr');

  // This function is called whenever the props change
  const updateTemplateStyles = () => {
    setTemplateAreas(props.templateAreas);
    setTemplateColumns(props.templateColumns || '1fr');
    setTemplateRows(props.templateRows || '1fr');
  };

  // Call the function to initially set the template styles
  updateTemplateStyles();

  // Cleanup function to stop the watcher when the component is unmounted
  onCleanup(() => {
    updateTemplateStyles();
  });

  return (
    <Grid
      style={`grid-template-areas: ${getTemplateAreas()};
              grid-template-columns: ${getTemplateColumns()};
              grid-template-rows: ${getTemplateRows()};`}
    >
      {props.children}
    </Grid>
  );
};
