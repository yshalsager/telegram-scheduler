import assert from 'node:assert/strict'
import {registerHooks} from 'node:module'
import {test} from 'node:test'

let browser = true
const navigation = `export const goto = (await import('node:test')).mock.fn(() => Promise.resolve())`
const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
        const source =
            specifier === '$app/env'
                ? `export const browser = ${browser}`
                : specifier === '$app/navigation'
                  ? navigation
                  : null
        return source === null
            ? nextResolve(specifier, context)
            : {url: `data:text/javascript,${encodeURIComponent(source)}`, shortCircuit: true}
    },
})

test('navigation replaces history, propagates failures, and skips server rendering', async () => {
    try {
        const {goto} = await import('$app/navigation')
        const {navigateAndReplaceState} = await import('../src/lib/navigation.js')
        await navigateAndReplaceState('/app/')
        assert.deepEqual(goto.mock.calls[0].arguments, ['/app/', {replace: true}])

        goto.mock.mockImplementation(() => Promise.reject(new Error('navigation failed')))
        await assert.rejects(navigateAndReplaceState('/login/'), /navigation failed/)

        browser = false
        const server = await import('../src/lib/navigation.js?server')
        assert.equal(server.navigateAndReplaceState('/app/'), false)
        assert.equal(goto.mock.callCount(), 2)
    } finally {
        hooks.deregister()
    }
})
