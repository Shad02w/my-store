import { describe, expect } from 'vitest'
import { groupBy } from '../src/util'

describe('groupBy tests', it => {
    it('groups by string values', () => {
        expect(
            groupBy(
                [
                    { id: 1, name: 'abc' },
                    { id: 3, name: 'abc' },
                    { id: 5, name: 'bbc' },
                ],
                'name',
            ),
        ).toEqual({
            abc: [
                { id: 1, name: 'abc' },
                { id: 3, name: 'abc' },
            ],
            bbc: [{ id: 5, name: 'bbc' }],
        })
    })

    it('groups by numeric values', () => {
        expect(
            groupBy(
                [
                    { id: 1, age: 30 },
                    { id: 2, age: 25 },
                    { id: 3, age: 30 },
                ],
                'age',
            ),
        ).toEqual({
            30: [
                { id: 1, age: 30 },
                { id: 3, age: 30 },
            ],
            25: [{ id: 2, age: 25 }],
        })
    })

    it('groups by boolean values', () => {
        expect(
            groupBy(
                [
                    { id: 1, active: true },
                    { id: 2, active: false },
                    { id: 3, active: true },
                ],
                'active',
            ),
        ).toEqual({
            true: [
                { id: 1, active: true },
                { id: 3, active: true },
            ],
            false: [{ id: 2, active: false }],
        })
    })

    it('handles empty array', () => {
        expect(groupBy([], 'anyKey')).toEqual({})
    })

    it('groups by non-existent key', () => {
        expect(
            groupBy(
                [
                    { id: 1, name: 'abc' },
                    { id: 2, name: 'def' },
                ],
                // @ts-expect-error -- intentionally passing invalid key
                'nonExistentKey',
            ),
        ).toEqual({
            undefined: [
                { id: 1, name: 'abc' },
                { id: 2, name: 'def' },
            ],
        })
    })
})
