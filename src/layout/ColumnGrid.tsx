import { JSX, createEffect, createMemo, createSignal, onCleanup } from 'solid-js'
import { styled } from 'solid-styled-components'
import { Button, Dropdown, DropdownOption, TextField } from '../core'
import { Row, Column } from './'

type Item = {
  id: number
  category: string
  score: number
  content: JSX.Element
}

interface GridItemProps {
  children?: JSX.Element[] | JSX.Element
  key?: string
}

interface ColumnGridProps {
  columns?: number
  gap?: string
  items?: Item[]
  sizes?: number[]
  rowSizes?: number[]
}

const Grid = styled('div')<ColumnGridProps>`
  display: grid;
  grid-template-columns: ${props =>
    props.sizes?.map(size => `${size}fr`).join(' ') || 'repeat(auto-fill, minmax(200px, 1fr))'};
  grid-template-rows: ${props => props.rowSizes?.map(size => `${size}fr`).join(' ') || 'auto'};
  gap: ${props => props.gap || '2rem'};
  color: var(--color-primary);
`

const GridItem = styled('div')<GridItemProps>`
  padding: 1rem;
  background-color: var(--color-white);
  border-left: 1px solid var(--color-primary);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-10px); // Lift effect on hover
  }
`

enum SortingOption {
  NONE = 'None',
  ASCENDING = 'Ascending',
  DESCENDING = 'Descending',
}

const ControlPanel = styled('div')`
  background-color: var(--color-white);
  color: var(--color-primary);
`

export const ColumnGrid = (props: ColumnGridProps) => {
  const {
    columns = 4,
    gap = '1rem',
    items: initialItems = [],
    sizes = Array(columns).fill(12 / columns),
    rowSizes = Array(columns).fill(12 / columns),
  } = props
  const [items, setItems] = createSignal(initialItems)
  const [filter, setFilter] = createSignal<string | null>(null)
  const [sortingOption, setSortingOption] = createSignal<SortingOption>(SortingOption.NONE)
  const [categories, setCategories] = createSignal<string[]>([])
  const [searchTerm, setSearchTerm] = createSignal<string>('')

  // update categories whenever items change
  createEffect(() => {
    setCategories([...new Set(items().map(item => item.category))])
  })

  // Sort and filter items
  const visibleItems = createMemo(() => {
    let result: Item[] = items()
    if (filter() !== null) {
      result = result.filter(item => item.category === filter())
    }

    if (searchTerm() !== '') {
      result = result.filter(item => item.category.includes(searchTerm()))
    }

    switch (sortingOption()) {
      case SortingOption.ASCENDING:
        return result.sort((a, b) => a.score - b.score)
      case SortingOption.DESCENDING:
        return result.sort((a, b) => b.score - a.score)
      default:
        return result
    }
  })

  onCleanup(() => setItems([]))

  return (
    <Column gap="3rem">
      <ControlPanel>
        <Row gap="1rem">
          {categories().map((category, idx) => (
            <Button key={category} onClick={() => setFilter(category)}>
              {category}
            </Button>
          ))}
          <Button onClick={() => setFilter(null)}>Clear</Button>
        </Row>
      </ControlPanel>
      <ControlPanel>
        <Row gap="1rem">
          <TextField
            id="searchTerm"
            value={searchTerm()}
            onEnter={value => setSearchTerm(value || '')}
            placeholder="Category..."
            label="Search"
            width="200px"
            inline
          />
          <Dropdown
            defaultLabel="Sort By"
            onChange={value => setSortingOption(value as SortingOption)}
          >
            {Object.values(SortingOption).map(option => (
              <DropdownOption label={option} value={option} key={option} />
            ))}
          </Dropdown>
        </Row>
      </ControlPanel>
      <Grid columns={columns} gap={gap} sizes={sizes} rowSizes={rowSizes}>
        {visibleItems().map((item, idx) => (
          <GridItem key={`${idx}`}>
            {item.content}({item.score})
          </GridItem>
        ))}
      </Grid>
    </Column>
  )
}
