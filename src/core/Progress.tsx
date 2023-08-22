import { createMemo } from 'solid-js'
import { styled } from 'solid-styled-components'
import Text from './Text'
import {Center} from '../layout'
import Spinner from './Spinner'

const ProgressBackground = styled('div')<{ width?: string; height?: string; bgColor?: string }>`
  width: ${props => props.width || 'var(--progress-width)'};
  height: ${props => props.height || 'var(--progress-height)'};
  background-color: ${props => props.bgColor || 'var(--progress-bg-color)'};
  border-radius: var(--progress-border-radius);
  overflow: hidden;
  position: relative;
`

const ProgressBar = styled('div')<{ width?: string; height?: string; bgColor?: string }>`
  height: ${props => props.height || 'var(--progress-height)'};
  width: ${props => props.width};
  background-color: ${props => props.bgColor || 'var(--progress-color)'};
  transition: width 0.3s ease;
`

interface ProgressProps {
  value: number
  max: number
  width?: string
  height?: string
  color?: string
  bgColor?: string
  textColor?: string
  showPercentage?: boolean
  spinner?: 'quarter' | 'half' | 'majority' | boolean
}

const Progress = (props: ProgressProps) => {
  const percentage = createMemo(() => `${Math.round((props.value / props.max) * 100)}%`)
  const spinnerHeight = createMemo(() =>
    props.height ? `calc(${props.height}*0.5)` : `calc(var(--progress-height) * 0.5)`,
  )
  const progressWidth = createMemo(() => `${(props.value / props.max) * 100}%`)

  return (
    <ProgressBackground width={props.width} height={props.height} bgColor={props.bgColor}>
      {props.showPercentage && (
        <Center>
          <Text align="center" color={props.textColor}>
            {percentage}
          </Text>
        </Center>
      )}
      {props.spinner && !props.showPercentage && (
        <Center>
          <Spinner size={spinnerHeight()} ring={props.spinner} />
        </Center>
      )}

      <ProgressBar
        width={progressWidth()}
        height={props.height}
        bgColor={props.color}
      ></ProgressBar>
    </ProgressBackground>
  )
}

export default Progress
