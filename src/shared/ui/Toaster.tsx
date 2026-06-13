import { createToaster, Toaster as ChakraToaster } from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top-end',
})

export const Toaster = () => <ChakraToaster toaster={toaster}>{(toast) => <div>{toast.title}</div>}</ChakraToaster>
