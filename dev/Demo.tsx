import { createEffect, createSignal } from 'solid-js'
import {
  Button,
  Card,
  Checkbox,
  Column,
  ColumnGrid,
  DotButton,
  CustomDialog,
  CustomDialogProps,
  Dialog,
  Divider,
  Dropdown,
  DropdownOption,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  PopoverPosition,
  Progress,
  Radio,
  RadioGroup,
  Row,
  NavPanel,
  NavLink,
  NavButton,
  Spinner,
  Switch,
  Text,
  TextField,
  ToastManager,
  ToastType,
  ToastFunc,
  ToggleButton,
  Tooltip,
  TopLeft,
  TopRight,
  Color,
  GlobalStyle,
  Pagination,
  Breadcrumbs,
  ClipButton,
  MenuDivider,
  LightTheme,
  DarkTheme,
  ThemeProps,
  Drawer,
} from '../src'
import { styled } from 'solid-styled-components'

const MyComplexDialog = (props: CustomDialogProps) => {
  const onClose = props.onClose || (() => {})
  const onConfirm = props.onConfirm || (() => {})

  const header = (
    <Row justifyContent="center">
      <Text weight="700" size="1.25rem">
        {props.title}
      </Text>
      <TopLeft padding="1.25rem">
        <DotButton icon="iconoir-question-mark" onClick={() => onClose()} />
      </TopLeft>
      <TopRight padding="1.25rem">
        <DotButton icon="iconoir-refresh" onClick={() => onClose()} margin="0 0.5rem 0 0" />
        <DotButton icon="iconoir-cancel" onClick={() => onClose()} />
      </TopRight>
    </Row>
  )

  const returnedData = { msg: 'hello' }

  const footer = (
    <Row>
      <IconButton
        icon="iconoir-check"
        text="Yes"
        onClick={() => {
          onConfirm(returnedData)
          onClose()
        }}
      />
    </Row>
  )

  return (
    <CustomDialog {...props} header={header} footer={footer}>
      {props.children}
    </CustomDialog>
  )
}

// Define a Demo component and DemoProps as a container of Card components.
type DemoProps = {
  children?: never
}
const BaseDemo = styled('div')`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`

const Demo = (props: DemoProps) => {
  const [value, setValue] = createSignal<string | undefined>('')

  const onChangeTextField = (newValue: string | undefined) => {
    setValue(newValue)
  }

  const onEnterTextField = (newValue: string | undefined) => {
    setValue(newValue)
  }

  let items = [
    { id: 1, category: 'Fruit', score: 10, content: <div>Apple</div> },
    { id: 2, category: 'Fruit', score: 10, content: <div>Banana</div> },
    { id: 3, category: 'Animal', score: 20, content: <div>Dog</div> },
    { id: 4, category: 'Animal', score: 20, content: <div>Cat</div> },
    { id: 5, category: 'Animal', score: 20, content: <div>Pig</div> },
    { id: 6, category: 'Vegetable', score: 1, content: <div>Spinich</div> },
    { id: 7, category: 'Vegetable', score: 0, content: <div>Lettuce</div> },
  ]
  const area = `
  'a a a'
  'b b c'
  'b b c'
  'd e f'
  `
  const [progress, setProgress] = createSignal(0)
  createEffect(() => {
    let interval: any = setInterval(() => {
      if (progress() >= 100) return clearInterval(interval)
      setProgress(progress() + 2)
    }, 200)
    return () => clearInterval(interval)
  })

  let toast: ToastFunc

  const [showDialog, setShowDialog] = createSignal(false)
  const [showDialog2, setShowDialog2] = createSignal(false)

  // For pagination
  const [offset, setOffset] = createSignal(1)
  const total = 100
  const limit = 10

  const onCopy = (text?: string) => {
    toast('Copied text', ToastType.PRIMARY)
  }

  const onClickMenu = (text?: string) => {}

  const customStyle = `
    backgroundColor: #8CB2D1;
    border: 1px solid #8CB2D1;
    borderRadius: 4px;
    padding: 1rem;
  `

  const customStyleDropdown = `
    border: 4px solid #E83F6F;  
    background-color: #E83F6F;
    font-size: 1.5rem;
    color: #fff;
    &:hover{
      box-shadow: 0 0 4px #E83F6F;
    }
  `
  const customClassDropdown = 'dummy'

  const customStyleButton = `
    background-color: #FFBF00;
    color: #fff;
    border:0;
    padding: 20px 10px;
    &:hover{
      border:0;
    }
  `

  const customStyleIconButton = `
    background-color: #FFBF00;
    color: #fff;
    border:0;
    padding: 10px 20px;
    &:hover{
      border:0;
    }
    i {
      color: #fff;
    }

    &:disabled {
      background-color: black !important;
    }
  `

  const getPopoverText = () => (
    <Text>
      "In the industrial design field of human–computer interaction, a user interface (UI) is the
      space where interactions between humans and machines occur. The goal of this interaction is to
      allow effective operation and control of the machine from the human end, while the machine
      simultaneously feeds back information that aids the operators' decision-making process."
    </Text>
  )

  const getPopoverMenu = () => (
    <Menu width="200px">
      <MenuItem key="about" onClick={onClickMenu}>
        <Text weight="200">About</Text>
      </MenuItem>
      <MenuDivider />
      <MenuItem key="open" onClick={onClickMenu}>
        <Row width="100%" justifyContent="space-between">
          <Text weight="200">Open</Text>
          <Icon icon="iconoir-open-new-window" />
        </Row>
      </MenuItem>
      <MenuItem key="settings" onClick={onClickMenu}>
        <Row width="100%" justifyContent="space-between">
          <Text weight="200">Setting ...</Text>
          <Icon icon="iconoir-settings" />
        </Row>
      </MenuItem>
      <MenuDivider />
      <MenuItem key="exit" onClick={onClickMenu}>
        <Text weight="200">Exit</Text>
      </MenuItem>
    </Menu>
  )

  const tooltipString = `In the industrial design field of human–computer interaction, a user interface (UI) is the
      space where interactions between humans and machines occur. The goal of this interaction is to
      allow effective operation and control of the machine from the human end, while the machine
      simultaneously feeds back information that aids the operators' decision-making process.`

  const [isOpen, setIsOpen] = createSignal(true)
  return (
    <BaseDemo>      
      <ToastManager toast={cb => (toast = cb)} />
      <Card title="Pagination" size="lg" gap="1rem">
        <Pagination
          total={total}
          limit={limit}
          offset={offset()}
          onChange={newOffset => setOffset(newOffset)}
        />
      </Card>      
      <Card title="Popover" size="lg">
        <Row gap="1rem">
          <Column gap="0.5rem">
            <Popover content={getPopoverText()} position="top" key="AAA">
              <Button>top</Button>
            </Popover>
            <Popover content={getPopoverMenu()} position="top-left">
              <Button>top-left</Button>
            </Popover>
            <Popover content={getPopoverMenu()} position="top-right">
              <Button>top-right</Button>
            </Popover>
            <Popover width="40px" content={getPopoverMenu()} position="left">
              <Button>left</Button>
            </Popover>
            <Popover content={getPopoverMenu()} position="left-top">
              <Button>left-top</Button>
            </Popover>
            <Popover content={getPopoverMenu()} position="left-bottom">
              <Button>left-bottom</Button>
            </Popover>
          </Column>

          <Column>
            <Popover content={getPopoverMenu()} position="top">
              <button>top</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="top-left">
              <button>top-left</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="top-right">
              <button>top-right</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="left">
              <button>left</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="left-top">
              <button>left-top</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="left-bottom">
              <button>left-bottom</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="bottom">
              <button>bottom</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="bottom-left">
              <button>bottom-left</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="bottom-right">
              <button>bottom-right</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="right">
              <button>right</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="right-top">
              <button>right-top</button>
            </Popover>
            <Popover content={getPopoverMenu()} position="right-bottom">
              <button>right-bottom</button>
            </Popover>
          </Column>

          <Column gap="0.5rem">
            <Popover content={getPopoverText()} position="bottom">
              <Button>bottom</Button>
            </Popover>
            <Popover content={getPopoverMenu()} position="bottom-left">
              <Button>bottom-left</Button>
            </Popover>
            <Popover content={getPopoverMenu()} position="bottom-right">
              <Button>bottom-right</Button>
            </Popover>
            <Popover content={getPopoverMenu()} position="right">
              <Button>right</Button>
            </Popover>
            <Popover content={getPopoverMenu()} position="right-top">
              <Button>right-top</Button>
            </Popover>
            <Popover content={getPopoverMenu()} position="right-bottom">
              <Button>right-bottom</Button>
            </Popover>
          </Column>
        </Row>
      </Card>
      <Card title="Tooltip" size="lg">
        <Row gap="2rem">
          <Column gap="0.5rem">
            <Tooltip text={tooltipString} position="top">
              <Button>top</Button>
            </Tooltip>
            <Tooltip text={tooltipString} position="top-left">
              <Button>top-left</Button>
            </Tooltip>
            <Tooltip text={tooltipString} position="top-right">
              <Button>top-right</Button>
            </Tooltip>
            <Tooltip width="40px" text={tooltipString} position="left">
              <Button>left</Button>
            </Tooltip>
            <Tooltip text={tooltipString} position="left-top">
              <Button>left-top</Button>
            </Tooltip>
            <Tooltip text={tooltipString} position="left-bottom">
              <Button>left-bottom</Button>
            </Tooltip>
          </Column>

          <Column>
            <Tooltip text="top" position="top">
              <button>top</button>
            </Tooltip>
            <Tooltip text={tooltipString} position="top-left">
              <button>top-left</button>
            </Tooltip>
            <Tooltip text={tooltipString} position="top-right">
              <button>top-right</button>
            </Tooltip>
            <Tooltip text="left" position="left">
              <button>left</button>
            </Tooltip>
            <Tooltip text={tooltipString} position="left-top">
              <button>left-top</button>
            </Tooltip>
            <Tooltip text={tooltipString} position="left-bottom">
              <button>left-bottom</button>
            </Tooltip>
            <Tooltip text="bottom" position="bottom">
              <button>bottom</button>
            </Tooltip>
            <Tooltip text={tooltipString} position="bottom-left">
              <button>bottom-left</button>
            </Tooltip>
            <Tooltip text={tooltipString} position="bottom-right">
              <button>bottom-right</button>
            </Tooltip>
            <Tooltip text="right" position="right">
              <button>right</button>
            </Tooltip>
            <Tooltip text={tooltipString} position="right-top">
              <button>right-top</button>
            </Tooltip>
            <Tooltip text={tooltipString} position="right-bottom">
              <button>right-bottom</button>
            </Tooltip>
          </Column>

          <Column gap="0.5rem">
            <Tooltip text="bottom" position="bottom">
              <Button>bottom</Button>
            </Tooltip>
            <Tooltip text={tooltipString} position="bottom-left">
              <Button>bottom-left</Button>
            </Tooltip>
            <Tooltip text={tooltipString} position="bottom-right">
              <Button>bottom-right</Button>
            </Tooltip>
            <Tooltip text="right" position="right">
              <Button>right</Button>
            </Tooltip>
            <Tooltip text={tooltipString} position="right-top">
              <Button>right-top</Button>
            </Tooltip>
            <Tooltip text={tooltipString} position="right-bottom">
              <Button>right-bottom</Button>
            </Tooltip>
          </Column>
        </Row>
      </Card>

      <Card title="NavPanel" size="lg">
        <Row>
          <NavPanel>
            <Column gap="1rem">
              <NavLink href="#home" icon="iconoir-home" text="Home" />
              <NavLink href="#docs" icon="iconoir-doc-search" text="Docs" />
              <NavLink href="#resource" icon="iconoir-brain-electricity" text="resource" />
            </Column>
            <Column gap="1rem">
              <NavButton icon="iconoir-shield-alert" />
              <NavButton icon="iconoir-cloud-download" />
            </Column>
          </NavPanel>

          <div style={{ height: '500px' }}></div>

          <NavPanel height="400px">
            <Column gap="1rem">
              <NavLink href="#home" icon="iconoir-home" text="Home" />
              <NavLink href="#docs" icon="iconoir-doc-search" text="Docs" />
              <NavLink href="#resource" icon="iconoir-brain-electricity" text="resource" />
            </Column>
            <Column gap="1rem">
              <NavButton icon="iconoir-shield-alert" />
              <NavButton icon="iconoir-cloud-download" />
            </Column>
          </NavPanel>
        </Row>
      </Card>

      <Card title="Menu" size="md">
        <Row gap="1rem">
          <Menu>
            <MenuItem>About</MenuItem>
            <MenuDivider />
            <MenuItem>Open</MenuItem>
            <MenuItem>Setting ... </MenuItem>
            <MenuDivider />
            <MenuItem>Exit</MenuItem>
          </Menu>

          <Menu width="200px">
            <MenuItem key="about" onClick={onClickMenu}>
              About
            </MenuItem>
            <MenuDivider />
            <MenuItem key="open" onClick={onClickMenu}>
              <Row width="100%" justifyContent="space-between">
                Open
                <Icon icon="iconoir-open-new-window" />
              </Row>
            </MenuItem>
            <MenuItem key="settings" onClick={onClickMenu}>
              <Row width="100%" justifyContent="space-between">
                <Text weight="400">Setting ...</Text>
                <Icon icon="iconoir-settings" />
              </Row>
            </MenuItem>
            <MenuDivider />
            <MenuItem key="exit" onClick={onClickMenu}>
              Exit
            </MenuItem>
          </Menu>
        </Row>
      </Card>

      <Card title="Toast" size="md" gap="1rem">
        <Button
          width="170px"
          text="PRIMARY Toast"
          onClick={() => toast && toast('Hi, this is a PRIMARY message!', ToastType.PRIMARY)}
        />
        <Button
          width="170px"
          text="WARNING Toast"
          onClick={() => toast && toast('Hi, this is a WARNING message!', ToastType.WARNING)}
        />
        <Button
          width="170px"
          text="SUCCESS Toast"
          onClick={() => toast && toast('Hi, this is a SUCCESS message!', ToastType.SUCCESS)}
        />
        <Button
          width="170px"
          text="DANGER Toast"
          onClick={() => toast && toast('Hi, this is a DANGER message!', ToastType.DANGER)}
        />
      </Card>



      <Card title="Breadcrumbs" size="md" gap="1rem">
        <Breadcrumbs path="/home/first/second/third" />
      </Card>
      <Card title="Row / Column">
        <Row>
          <Icon icon="iconoir-wifi" scale="1.5" color="#ff0000" />
          111 <Divider color="#FF0000" />
          <Icon icon="iconoir-wifi" />
          111 <Divider />
          <Icon icon="iconoir-wifi" />
        </Row>
        <Column>
          aaa <Divider /> bbb <Divider width="40px" /> ccc
        </Column>
        <Row>
          aaa <Divider /> bbb <Divider /> ccc
        </Row>
        <Column>
          aaa <Divider /> bbb <Divider /> ccc
        </Column>
      </Card>

      <Card title="ClipButton" size="sm" gap="1rem">
        <Row width="170px">
          <ClipButton text="Copy" />
          <Text>Click to Copy</Text>
        </Row>
        <Row width="170px">
          <ClipButton text="Copy" onCopy={onCopy} />
          <Text>With Toast</Text>
        </Row>
      </Card>

      <Card title="Dialog" size="sm" gap="1rem">
        {showDialog() && (
          <Dialog
            onClose={() => setShowDialog(false)}
            title="My Dialog Title"
            showCloseButton={true}
            showCancelButton={true}
            showConfirmButton={true}
            align="flex-start"
          >
            This is the body of the dialog.
          </Dialog>
        )}
        {showDialog2() && (
          <MyComplexDialog
            onClose={() => setShowDialog2(false)}
            onConfirm={data => {}}
            title="My Custom Dialog"
            width="500px"
          >
            This is the body of the dialog.
          </MyComplexDialog>
        )}
        <Button text="Show Dialog" onClick={() => setShowDialog(!showDialog())} />
        <Button text="Custom Dialog" onClick={() => setShowDialog2(!showDialog2())} />
      </Card>
      <Card title="Spinner" size="sm">
        <Column gap="1rem">
          <Spinner />
          <Spinner size="100px" thickness="10px" ring="half" />
        </Column>
      </Card>
      <Card title="Progress" size="md" gap="1rem">
        <Progress value={progress()} max={200} />
        <Progress value={progress()} max={100} color={Color.blue2} bgColor={Color.light1} />
        <Progress
          value={progress()}
          max={100}
          width="120px"
          height="60px"
          textColor={Color.dark4}
          showPercentage
        />

        <Progress value={progress()} max={100} height="0.1rem" />
        <Progress
          value={progress()}
          max={100}
          color={Color.blue2}
          bgColor={Color.light1}
          spinner
          height="1rem"
        />
        <Progress value={progress()} max={100} spinner height="2rem" />

        <Progress value={progress()} max={100} spinner="quarter" color={Color.pink1} />
        <Progress value={progress()} max={150} spinner="half" color={Color.pink3} />
        <Progress value={progress()} max={200} spinner="majority" color={Color.pink5} />
      </Card>
      <Card title="ToggleButton" size="md" gap="0.7rem">
        <Row>
          <Column gap="1rem">
            <ToggleButton text="Toggle me" onChange={value => {}} />
            <ToggleButton text="Toggle me" noBorder />
            <ToggleButton text="Toggle me" noBorder disabled />
            <ToggleButton text="Toggle me" activeColor="red" inactiveColor="green" />
            <ToggleButton icon="iconoir-warning-triangle" gap="30px" text="Toggle me" />
            <ToggleButton icon="iconoir-warning-triangle" gap="30px" text="Toggle me" noBorder />
          </Column>
          <Column gap="1rem">
            <ToggleButton
              icon="iconoir-cancel"
              activeColor="#FFC824"
              inactiveColor="#FFE492"
              circle
              width="4rem"
              height="4rem"
              iconScale="2"
            />
            <ToggleButton
              icon="iconoir-bell"
              activeColor="#FFC824"
              inactiveColor="#FFE492"
              rounded="1rem"
              width="4rem"
              height="4rem"
            />

            <ToggleButton
              icon="iconoir-cancel"
              activeColor="#FFC824"
              inactiveColor="#FFE492"
              circle
              width="4rem"
              height="4rem"
              iconScale="2"
              noBorder
            />
            <ToggleButton
              icon="iconoir-bell"
              activeColor="#FFC824"
              inactiveColor="#FFE492"
              rounded="1rem"
              width="4rem"
              height="4rem"
              noBorder
            />
            <ToggleButton
              icon="iconoir-bell"
              activeColor="#FFC824"
              inactiveColor="#FFE492"
              rounded="1rem"
              width="4rem"
              height="4rem"
              noBorder
              disabled
            />
          </Column>
        </Row>
      </Card>

      <Card title="IconButton" gap="1rem" size="lg">
        <Row gap="1rem">
          <Column gap="1rem">
            <IconButton icon="iconoir-bell" text="IconButtonB" gap="8px" />
            <IconButton icon="iconoir-bell" text="IconButtonD" gap="8px" disabled />
            <IconButton icon="iconoir-bell" text="IconButtonB" gap="32px" />
            <IconButton icon="iconoir-erase" width="64px" height="64px" />
            <IconButton icon="iconoir-erase" width="64px" height="64px" disabled />
            <IconButton icon="iconoir-refresh" style={customStyleIconButton} />
            <IconButton icon="iconoir-refresh" style={customStyleIconButton} disabled />
          </Column>
          <Column gap="1rem">
            <IconButton icon="iconoir-send" circle width="64px" height="64px" />
            <IconButton icon="iconoir-send" circle width="64px" height="64px" disabled />
            <IconButton icon="iconoir-wifi" rounded="16px" width="64px" height="64px" />
            <IconButton icon="iconoir-wifi" rounded="16px" width="64px" height="64px" disabled />
            <IconButton icon="iconoir-wifi" rounded="16px" width="64px" height="64px" noBorder />
            <IconButton
              icon="iconoir-wifi"
              rounded="16px"
              width="64px"
              height="64px"
              noBorder
              disabled
            />
          </Column>
        </Row>
      </Card>

      <Card title="Button" gap="1rem" size="md">
        <Row gap="2rem">
          <Column gap="1rem">
            <Button text="Button" onClick={() => {}} />
            <Button text="Button" onClick={() => {}} disabled />
            <Button text="Custom Style" style={customStyleButton} />
            <Button text="Custom Style" style={customStyleButton} disabled />
          </Column>
          <Column gap="1rem">
            <Button text="Circle" circle width="80px" height="80px" key="circle1" />
            <Button text="Circle" circle width="80px" height="80px" key="circle2" disabled />
            <Button text="No Border" noBorder />
            <Button onClick={() => {}}>
              <Icon icon="iconoir-log-in" color={Color.pink2} />
              <Text color={Color.pink2}>Log In</Text>
            </Button>
            <Button onClick={() => {}} disabled>
              <Icon icon="iconoir-log-in" color={Color.pink2} />
              <Text color={Color.pink2}>Log In</Text>
            </Button>
          </Column>
        </Row>
      </Card>

      <Card title="Dropdown">
        <Column gap="1rem">
          <Dropdown defaultLabel="選擇正確的位置" onChange={() => {}}>
            <DropdownOption label="選項一" value="1" />
            <DropdownOption label="選項二" value="2" />
            <DropdownOption label="選項三" value="3" />
          </Dropdown>
          <Dropdown defaultLabel="選擇正確的位置" onChange={() => {}} disabled>
            <DropdownOption label="選項一" value="1" />
            <DropdownOption label="選項二" value="2" />
            <DropdownOption label="選項三" value="3" />
          </Dropdown>
          <Dropdown
            defaultLabel="選擇正確的位置"
            onChange={() => {}}
            style={customStyleDropdown}
            class={customClassDropdown}
          >
            <DropdownOption label="選項一" value="1" />
            <DropdownOption label="選項二" value="2" />
            <DropdownOption label="選項三" value="3" />
          </Dropdown>
        </Column>
      </Card>

      <Card title="ColumnGrid" size="lg">
        <ColumnGrid columns={5} gap="3rem" items={items} sizes={[2, 1, 1]} rowSizes={[1, 1, 1]} />
      </Card>

      <Card title="RadioGroup">
        <RadioGroup label="My Question 101" selectedOption="banana" onChange={() => {}}>
          <Radio label="Banana" value="banana" />
          <Radio label="Apple" value="apple" />
          <Radio label="Orange" value="Orange" />
        </RadioGroup>

        <RadioGroup label="My Question 102" selectedOption="banana" onChange={() => {}} inline>
          <Radio label="Banana" value="banana" />
          <Radio label="Apple" value="apple" />
          <Radio label="Orange" value="Orange" />
        </RadioGroup>

        <RadioGroup label="My Question 103" selectedOption="banana" inline disabled>
          <Radio label="Banana" value="banana" />
          <Radio label="Apple" value="apple" />
          <Radio label="Orange" value="Orange" />
        </RadioGroup>
      </Card>
      <Card title="Switch">
        <Switch label="Enable Camera" />
        <Switch label="Enable Camera" disabled />

        <Switch label="Enable Camera Number 1" indicatorAlign="right" />
        <Switch label="Enable Camera Number 2" indicatorAlign="right" />
      </Card>
      <Card title="TextField">
        <TextField
          id="account"
          value={value()}
          onEnter={onEnterTextField}
          onChange={onChangeTextField}
          placeholder="請輸入文字"
          maxLength={10}
          // selectOnFocus
          label="帳號名稱"
          sublabel="*"
          width="200px"
          inline
          class="abc"
        />
        <Text size="sm" align="center">
          {value()}
        </Text>

        <TextField
          id="disabled textfield"
          placeholder="請輸入文字"
          maxLength={10}
          label="帳號名稱"
          sublabel="*"
          width="200px"
          inline
          disabled
        />
      </Card>
      <Card title="Checkbox">
        <Checkbox label="Awesome" />
        <Checkbox label="Awesome" disabled />
      </Card>
      <Card title="Text">
        <Text size="lg" weight="bold" align="center">
          Neo-minimalism Design
        </Text>
        <Text size="sm" align="center">
          以人為本的設計方法
        </Text>
        <Divider height="1.5rem" />
        <Text textIndent="2rem" margin="0 0 1.5rem 0">
          Neo-Minimalism，或新極簡主義，是一種現代藝術和設計風格，它強調簡單、清晰並且功能性強。這種風格起源於20世紀50年代的極簡主義運動，但在設計理念和視覺表現上有所創新和擴展。
          在視覺藝術中，新極簡主義強調使用簡單的顏色、形狀和線條來創造強大的視覺效果。在產品設計和建築中，新極簡主義強調簡單和清晰的線條，以及功能性和效率。
          在Web
        </Text>
        <Text textIndent="2rem">
          UI設計中，新極簡主義可能表現為簡單但強大的用戶界面，具有清晰的導航、少量的色彩和視覺元素，以及大量的空白空間。新極簡設計可能也會使用大膽的排版和強烈的對比來創造視覺焦點。
          整體來說，新極簡主義的目標是通過去除非必要的元素來提高清晰度和理解性，並創造出一種輕鬆且無壓力的用戶體驗。
        </Text>
      </Card>
      <Card title="h1-h6" size="lg" gap="0rem">
        <h1>Neo Minimalism (h1)</h1>
        <h2>Neo Minimalism (h2)</h2>
        <h3>Neo Minimalism (h3)</h3>
        <h4>Neo Minimalism (h4)</h4>
        <h5>Neo Minimalism (h5)</h5>
        <h6>Neo Minimalism (h6)</h6>
        <p>Neo Minimalism (p)</p>
      </Card>
    </BaseDemo>
  )
}

export default Demo
