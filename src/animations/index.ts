import type { ComponentType } from 'react'
import type { AnimationId } from '../data/posts'
import CopilotExperiences from './CopilotExperiences'
import HooksTimeline from './HooksTimeline'
import McpFlow from './McpFlow'
import SkillLoader from './SkillLoader'
import TokenBudget from './TokenBudget'
import ManagedSettings from './ManagedSettings'
import AgenticWorkflow from './AgenticWorkflow'

export const animations: Record<AnimationId, ComponentType> = {
  'copilot-experiences': CopilotExperiences,
  'skill-loader': SkillLoader,
  'mcp-flow': McpFlow,
  'hooks-timeline': HooksTimeline,
  'token-budget': TokenBudget,
  'managed-settings': ManagedSettings,
  'agentic-workflow': AgenticWorkflow,
}
