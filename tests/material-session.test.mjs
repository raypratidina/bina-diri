import test from 'node:test'
import assert from 'node:assert/strict'
import { freshMaterialSession, transitionMaterial, TAP_GUARD_MS } from '../.verification/unit/features/materials/materialSession.js'
import { materials } from '../.verification/unit/data/materials.js'
import { existsSync, readFileSync } from 'node:fs'

test('approved wording matches the handoff for every material', () => {
  const handoff = readFileSync('docs/BINA_DIRI_CODEX_HANDOFF.md', 'utf8')
  for (const material of materials) {
    const section = handoff.split(`### ${material.title}`)[1].split('\n### ')[0]
    assert.ok(section.includes(`**${material.intro.text}**`))
    assert.ok(section.includes(`**${material.completion.text}**`))
    material.steps.forEach((step, index) => assert.ok(section.includes(`${index + 1}. ${step.text}\n`), step.text))
  }
})

test('five materials have six unique step assets and complete content', () => {
  assert.equal(materials.length, 5)
  for (const material of materials) {
    assert.equal(material.steps.length, 6)
    assert.equal(new Set(material.steps.map(s => s.id)).size, 6)
    assert.equal(new Set(material.steps.map(s => s.image)).size, 6)
    for (const image of [material.intro.image, material.completion.image, ...material.steps.map(s => s.image)]) {
      assert.ok(existsSync(`public${image}`), image)
    }
  }
})

test('each material advances six steps, then completes and cannot advance further', () => {
  for (const material of materials) {
    let state = transitionMaterial(freshMaterialSession(), { type: 'start', now: 0 }, material.steps.length)
    assert.equal(state.currentStepIndex, 0)
    for (let index = 1; index < 6; index++) {
      state = transitionMaterial(state, { type: 'next', now: index * 1000 }, 6)
      assert.equal(state.currentStepIndex, index)
      assert.equal(state.phase, 'learning')
    }
    state = transitionMaterial(state, { type: 'next', now: 6000 }, 6)
    assert.equal(state.phase, 'complete')
    assert.equal(state.currentStepIndex, 5)
    assert.equal(transitionMaterial(state, { type: 'next', now: 7000 }, 6), state)
  }
})

test('back moves one step and step one returns to intro', () => {
  let state = transitionMaterial(freshMaterialSession(), { type: 'start', now: 0 }, 6)
  state = transitionMaterial(state, { type: 'next', now: 1000 }, 6)
  state = transitionMaterial(state, { type: 'back', now: 2000 }, 6)
  assert.equal(state.currentStepIndex, 0)
  assert.equal(state.phase, 'learning')
  state = transitionMaterial(state, { type: 'back', now: 3000 }, 6)
  assert.equal(state.phase, 'intro')
  assert.equal(state.currentStepIndex, 0)
})

test('rapid start, next, and mixed back/next inputs cannot skip steps', () => {
  let state = transitionMaterial(freshMaterialSession(), { type: 'start', now: 0 }, 6)
  assert.equal(transitionMaterial(state, { type: 'next', now: 100 }, 6), state)
  state = transitionMaterial(state, { type: 'next', now: TAP_GUARD_MS }, 6)
  const accepted = state
  for (const [type, now] of [['next', 451], ['next', 500], ['back', 650], ['next', 850]]) {
    state = transitionMaterial(state, { type, now }, 6)
    assert.equal(state, accepted)
  }
  assert.equal(state.currentStepIndex, 1)
  state = transitionMaterial(state, { type: 'next', now: 900 }, 6)
  assert.equal(state.currentStepIndex, 2)
})

test('reset clears completion and step; actions before starting have no effect', () => {
  const fresh = freshMaterialSession()
  assert.equal(transitionMaterial(fresh, { type: 'next', now: 1000 }, 6), fresh)
  assert.equal(transitionMaterial(fresh, { type: 'back', now: 1000 }, 6), fresh)
  const reset = transitionMaterial({ phase: 'complete', currentStepIndex: 5, lastTransitionAt: 5000 }, { type: 'reset' }, 6)
  assert.deepEqual(reset, fresh)
})
