export const TAP_GUARD_MS = 450

export interface MaterialSession {
  phase: 'intro' | 'learning' | 'complete'
  currentStepIndex: number
  lastTransitionAt: number
}
export type MaterialAction = { type: 'start' | 'next' | 'back'; now: number } | { type: 'reset' }

export function freshMaterialSession(): MaterialSession {
  return { phase: 'intro', currentStepIndex: 0, lastTransitionAt: -Infinity }
}

// Pure transitions: no storage, routing, or image-readiness dependency.
export function transitionMaterial(state: MaterialSession, action: MaterialAction, stepCount: number): MaterialSession {
  if (action.type === 'reset') return freshMaterialSession()
  if (stepCount < 1 || action.now - state.lastTransitionAt < TAP_GUARD_MS) return state
  const changed = { ...state, lastTransitionAt: action.now }
  if (action.type === 'start' && state.phase === 'intro') {
    return { ...changed, phase: 'learning', currentStepIndex: 0 }
  }
  if (state.phase !== 'learning') return state
  if (action.type === 'next') {
    return state.currentStepIndex === stepCount - 1
      ? { ...changed, phase: 'complete' }
      : { ...changed, currentStepIndex: state.currentStepIndex + 1 }
  }
  if (action.type === 'back') {
    return state.currentStepIndex === 0
      ? { ...changed, phase: 'intro' }
      : { ...changed, currentStepIndex: state.currentStepIndex - 1 }
  }
  return state
}
