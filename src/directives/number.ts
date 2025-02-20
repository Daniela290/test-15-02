export default {
    beforeMount(el: HTMLElement | HTMLInputElement, binding: any) {
        const isInteger = !!binding?.modifiers?.integer
        let input:HTMLInputElement
        if (el.tagName?.toLowerCase() === 'input') input = (el as HTMLInputElement)
        else input = (el.querySelector('input') as HTMLInputElement);
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const backspace = 8, point = 190, deleteCode = 46

        input?.addEventListener('keydown', (event: any) => {
             if ((input as HTMLInputElement).value === '0') {
                if (event.key === '0') {
                    event.preventDefault()
                } else if (numbers.includes(event.key)) {
                    input.value = event.key
                    event.preventDefault()
                }
            }

            if ((input as HTMLInputElement).value === '' && event.keyCode === point && !isInteger) {
                input.value = '0'
            }

            if (numbers.includes(event.key) || event.keyCode === backspace || event.keyCode === deleteCode) {
                return
            }
            if (!isInteger && event.keyCode === point) {
                if (!(input as HTMLInputElement).value?.includes('.')) {
                    return;
                }
            }

            event.preventDefault()
        })
        input?.addEventListener('paste', (event: ClipboardEvent) => {
            event.preventDefault()
            const text: any = event.clipboardData?.getData('text/plain')?.trim()
            if (isNaN(text)) return

            if (isInteger) {
                input.value = text?.replace(/^0+/, '')?.replaceAll('.', '')
            } else {
                const resText = text?.replace(/^0+/, '')
                if (resText?.startsWith('.')) {
                    input.value = `0${resText}`
                } else {
                    input.value = resText
                }
            }
            return;
        });
    }
}