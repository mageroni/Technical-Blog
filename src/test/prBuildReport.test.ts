import { describe, expect, it } from 'vitest'
import workflow from '../../.github/workflows/pr-build-report.md?raw'
import lock from '../../.github/workflows/pr-build-report.lock.yml?raw'

describe('autenticación del reporte de builds', () => {
  it('habilita solicitudes de Copilot en el workflow fuente', () => {
    const frontmatter = workflow.split('---')[1]
    expect(frontmatter).toMatch(/^permissions:\n(?:  .*\n)*  copilot-requests: write$/m)
  })

  it.each(['agent', 'detection'])('usa el token de Actions en el job %s', (name) => {
    const job = lock.split(`\n  ${name}:\n`)[1]?.split(/\n  [\w-]+:\n/)[0] ?? ''
    expect(job).toMatch(/^    permissions:\n(?:      .*\n)*      copilot-requests: write$/m)
    expect(job).toContain('COPILOT_GITHUB_TOKEN: ${{ github.token }}')
    expect(job).toContain('S2STOKENS: true')
  })

  it('no exige un secreto personal de Copilot en el lock', () => {
    expect(lock).not.toContain('secrets.COPILOT_GITHUB_TOKEN')
    expect(lock).not.toContain('id: validate-secret')
    expect(lock).not.toContain('secret_verification_result')
  })
})
