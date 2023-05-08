import Vuetify from 'vuetify'
import { createLocalVue, ShallowMountOptions, Wrapper, mount } from '@vue/test-utils'
import { BaseFieldNumber } from '.'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()

localVue.use(Vuetify)

const mountComponent = (options?: ShallowMountOptions<Vue>): Wrapper<Vue> => {
    return mount(BaseFieldNumber, {
        localVue,
        vuetify: new Vuetify(),
        ...options,
    })
}

describe('BaseFieldNumber', () => {
    it.each`
        initialValue | inputValue       | inputValueEmitted | inputValueDisplay
        ${1}         | ${'123.3'}       | ${123}            | ${'123'}
        ${1}         | ${'as1df'}       | ${undefined}      | ${'1'}
        ${null}      | ${'as1df'}       | ${1}              | ${'1'}
        ${1}         | ${'-aa100asdf'}  | ${-100}           | ${'-100'}
        ${1}         | ${'10.aa.0.0.0'} | ${10}             | ${'10'}
        ${1}         | ${'-9.99'}       | ${-9}             | ${'-9'}
        ${1}         | ${'--04'}        | ${-4}             | ${'-4'}
        ${1}         | ${'a-s1df'}      | ${-1}             | ${'-1'}
    `(
        'should display and emit proper values — integers',
        async ({ initialValue, inputValue, inputValueEmitted, inputValueDisplay }) => {
            const wrapper = mountComponent({ propsData: { value: initialValue, precision: 0 } })

            wrapper.find('input').setValue(inputValue)

            await flushPromises()

            const input = wrapper.find('input').element as HTMLInputElement
            const [, updateEvent = []] = wrapper.emitted('update:value') ?? []

            expect(input.value).toBe(inputValueDisplay)
            expect(updateEvent[0]).toBe(inputValueEmitted)
        }
    )

    it.each`
        initialValue | inputValue       | inputValueEmitted | inputValueDisplay | precision
        ${1}         | ${''}            | ${0}              | ${''}             | ${3}
        ${0}         | ${'-.1234'}      | ${-0.123}         | ${'-0.123'}       | ${3}
        ${0}         | ${',1234'}       | ${0.123}          | ${'0.123'}        | ${3}
        ${0}         | ${'-100.1z234z'} | ${-100.123}       | ${'-100.123'}     | ${3}
        ${0}         | ${'-0.1234'}     | ${-0.123}         | ${'-0.123'}       | ${3}
        ${0}         | ${'3,1234'}      | ${3.1}            | ${'3.1'}          | ${1}
        ${0}         | ${'.-1234'}      | ${0.123}          | ${'0.123'}        | ${3}
        ${0}         | ${'.-1234'}      | ${0.1234}         | ${'0.1234'}       | ${9}
        ${0}         | ${'.'}           | ${0}              | ${'.'}            | ${0}
        ${0}         | ${'-.'}          | ${-0}             | ${'-.'}           | ${2}
    `(
        'should display and emit proper values — floats',
        async ({
            initialValue,
            inputValue,
            inputValueEmitted,
            inputValueDisplay,
            precision,
        }) => {
            const wrapper = mountComponent({
                propsData: { value: initialValue, precision },
            })

            wrapper.find('input').setValue(inputValue)

            await flushPromises()

            const input = wrapper.find('input').element as HTMLInputElement
            const [, updateEvent = []] = wrapper.emitted('update:value') ?? []

            expect(input.value).toBe(inputValueDisplay)
            expect(updateEvent[0]).toBe(inputValueEmitted)
        }
    )

    it.each`
        initialValue | inputValue | inputValueEmitted | inputValueDisplay
        ${1}         | ${''}      | ${null}           | ${''}
        ${0}         | ${''}      | ${null}           | ${''}
        ${null}      | ${''}      | ${undefined}      | ${''}
    `(
        'should display and emit proper values — nullable',
        async ({ initialValue, inputValue, inputValueEmitted, inputValueDisplay }) => {
            const wrapper = mountComponent({
                propsData: { value: initialValue, nullable: true },
            })

            wrapper.find('input').setValue(inputValue)

            await flushPromises()

            const input = wrapper.find('input').element as HTMLInputElement
            const [, updateEvent = []] = wrapper.emitted('update:value') ?? []

            expect(input.value).toBe(inputValueDisplay)
            expect(updateEvent[0]).toBe(inputValueEmitted)
        }
    )

    it.each`
        initialValue | inputValue      | inputValueEmitted | inputValueDisplay | min     | precision
        ${1}         | ${'0'}          | ${undefined}      | ${'1'}            | ${1}    | ${undefined}
        ${1}         | ${'4'}          | ${4}              | ${'4'}            | ${1}    | ${undefined}
        ${1}         | ${'-99'}        | ${-99}            | ${'-99'}          | ${-100} | ${undefined}
        ${1}         | ${'-99.99'}     | ${-99}            | ${'-99'}          | ${-100} | ${undefined}
        ${1}         | ${'-99.999'}    | ${-99.99}         | ${'-99.99'}       | ${-100} | ${2}
        ${1}         | ${'-99.9dda99'} | ${-99.999}        | ${'-99.999'}      | ${-100} | ${4}
        ${1}         | ${'-99.99,.-9'} | ${-99.99}         | ${'-99.99'}       | ${-100} | ${2}
        ${1}         | ${'-99,99'}     | ${-99.99}         | ${'-99.99'}       | ${-100} | ${2}
        ${1}         | ${'999,9999'}   | ${999.99}         | ${'999.99'}       | ${-100} | ${2}
    `(
        'should display and emit proper values — min',
        async ({
            initialValue,
            inputValue,
            inputValueEmitted,
            inputValueDisplay,
            min,
            precision,
        }) => {
            const wrapper = mountComponent({
                propsData: { value: initialValue, min, precision },
            })

            wrapper.find('input').setValue(inputValue)

            await flushPromises()

            const input = wrapper.find('input').element as HTMLInputElement
            const [, updateEvent = []] = wrapper.emitted('update:value') ?? []

            expect(input.value).toBe(inputValueDisplay)
            expect(updateEvent[0]).toBe(inputValueEmitted)
        }
    )

    it.each`
        initialValue | inputValue       | inputValueEmitted | inputValueDisplay | max     | precision
        ${1}         | ${'10'}          | ${5}              | ${'5'}            | ${5}    | ${undefined}
        ${0}         | ${'asd999aa'}    | ${99}             | ${'99'}           | ${99}   | ${2}
        ${1}         | ${'999.-999a99'} | ${999.99}         | ${'999.99'}       | ${1000} | ${2}
        ${0}         | ${'10.10'}       | ${5}              | ${'5'}            | ${5}    | ${undefined}
        ${1}         | ${'99.9900'}     | ${5}              | ${'5'}            | ${5}    | ${2}
        ${1}         | ${'10.99a-b999'} | ${10.99999}       | ${'10.99999'}     | ${20}   | ${6}
        ${1}         | ${'-aaa10'}      | ${-10}            | ${'-10'}          | ${5}    | ${2}
        ${1}         | ${'-aaa10.00'}   | ${-10}            | ${'-10'}          | ${5}    | ${0}
    `(
        'should display and emit proper values — max',
        async ({
            initialValue,
            inputValue,
            inputValueEmitted,
            inputValueDisplay,
            max,
            precision,
        }) => {
            const wrapper = mountComponent({
                propsData: { value: initialValue, max, precision },
            })

            wrapper.find('input').setValue(inputValue)

            await flushPromises()

            const input = wrapper.find('input').element as HTMLInputElement
            const [, updateEvent = []] = wrapper.emitted('update:value') ?? []

            expect(input.value).toBe(inputValueDisplay)
            expect(updateEvent[0]).toBe(inputValueEmitted)
        }
    )
})
