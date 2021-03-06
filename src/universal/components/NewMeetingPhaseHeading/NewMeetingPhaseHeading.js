/**
 * Renders the heading describing the current meeting phase.
 *
 * @flow
 */
import React from 'react'
import styled from 'react-emotion'
import ui from 'universal/styles/ui'
import {minWidthMediaQueries} from 'universal/styles/breakpoints'
import {meetingSidebarMediaQuery} from 'universal/styles/meeting'
import {phaseDescriptionLookup, phaseLabelLookup} from 'universal/utils/meetings/lookups'
import {createFragmentContainer} from 'react-relay'
import type {NewMeetingPhaseHeading_meeting as Meeting} from './__generated__/NewMeetingPhaseHeading_meeting.graphql'
import SidebarToggle from 'universal/components/SidebarToggle'

const HeadingBlock = styled('div')({
  alignItems: 'flex-start',
  display: 'flex',
  padding: '1.25rem 0 1rem'
})

const Toggle = styled(SidebarToggle)(({isMeetingSidebarCollapsed}) => ({
  margin: '0 1rem 0 .5rem',

  [meetingSidebarMediaQuery]: {
    display: isMeetingSidebarCollapsed ? 'block' : 'none'
  }
}))

const PhaseTitle = styled('h1')({
  fontSize: '1.25rem',
  lineHeight: '1.5',
  margin: 0
})

const PhaseDescription = styled('h2')({
  color: ui.labelHeadingColor,
  display: 'none',
  fontWeight: 'normal',
  margin: 0,

  [minWidthMediaQueries[1]]: {
    display: 'block',
    fontSize: '.875rem'
  }
})

type Props = {|
  meeting: Meeting,
  isMeetingSidebarCollapsed: Boolean,
  toggleSidebar: () => void
|}

const NewMeetingPhaseHeading = (props: Props) => {
  const {meeting, isMeetingSidebarCollapsed, toggleSidebar} = props
  const makeContent = () => {
    if (!meeting || !meeting.localPhase) return null
    const {
      localPhase: {phaseType}
    } = meeting
    const label = phaseLabelLookup[phaseType]
    const description = phaseDescriptionLookup[phaseType]
    return (
      <div>
        <PhaseTitle>{label}</PhaseTitle>
        <PhaseDescription>{description}</PhaseDescription>
      </div>
    )
  }
  return (
    <HeadingBlock>
      <Toggle onClick={toggleSidebar} isMeetingSidebarCollapsed={isMeetingSidebarCollapsed} />
      {makeContent()}
    </HeadingBlock>
  )
}

export default createFragmentContainer(
  NewMeetingPhaseHeading,
  graphql`
    fragment NewMeetingPhaseHeading_meeting on NewMeeting {
      localPhase {
        phaseType
      }
    }
  `
)
