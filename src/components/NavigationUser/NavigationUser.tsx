import { useAuth } from '@/hooks/ContextAuth'
import { Box, Flex } from '@chakra-ui/react'
import { ArrowArcLeft, Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import HandleButton from '../Buttons/HandleButton'
import AnamnesisCreate from './Anamnesis/AnamnesisCreate'
import CompleteUserRegistration from './CompleteUserRegistration'

export default function NavigationUser() {
  const { user } = useAuth()
  const [showAnamnesis, setShowAnamnesis] = useState(false)

  return (
    <>
      <Box ml={{ base: 0, md: 60 }} m={4} minH={'100vh'}>
        {!user?.isRegistered ? (
          <>
            <CompleteUserRegistration />
          </>
        ) : (
          <>
            <Box minH={'100vh'}>
              {user.hasAnamnesis ? (
                <h1>Painel com dashboard workouts e etc</h1>
              ) : (
                <>
                  {!showAnamnesis ? (
                    <>
                      <Flex
                        align={'left'}
                        alignSelf={'left'}
                        position={'relative'}
                        mt={3}
                        ml={3}
                      >
                        <HandleButton
                          text={'Preencher Anamnese'}
                          leftIcon={<Plus size={28} weight="bold" />}
                          onClick={() => setShowAnamnesis(true)}
                        />
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Flex
                        align={'left'}
                        alignSelf={'left'}
                        position={'relative'}
                        mt={3}
                        ml={3}
                      >
                        <HandleButton
                          text={'Voltar'}
                          leftIcon={<ArrowArcLeft size={28} weight="bold" />}
                          onClick={() => setShowAnamnesis(false)}
                        />
                      </Flex>
                    </>
                  )}
                </>
              )}
              {showAnamnesis ? <AnamnesisCreate /> : null}
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
