import { Box, createToaster, Text, Toaster as ChakraToaster } from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top-end',
})

export const Toaster = () => (
  <ChakraToaster toaster={toaster}>
    {(toast) => (
      <Box bg="neutral.0" borderWidth="1px" borderColor="neutral.200" borderRadius="md" px="4" py="3" boxShadow="md">
        <Text textStyle="medium-sm" color="text.1">
          {toast.title}
        </Text>
        {toast.description ? (
          <Text textStyle="regular-xs" color="text.3">
            {toast.description}
          </Text>
        ) : null}
      </Box>
    )}
  </ChakraToaster>
)
