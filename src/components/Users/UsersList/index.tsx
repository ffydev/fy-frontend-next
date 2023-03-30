import { getUserToken } from '@/pages/api/providers/auth.provider'
import {
  IUserInterface,
  updateUser,
} from '@/pages/api/providers/users.provider'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface UsersListProps {
  fetchUsersData: () => void
  user: IUserInterface
}
export function UsersList({ fetchUsersData, user }: UsersListProps) {
  const router = useRouter()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleUpdateUser = async (userId: string) => {
    try {
      const token = getUserToken()

      if (!token) {
        // Implementar mensagem personalizada
        router.push('/login')
        return
      }

      await updateUser(token, userId, {
        firstName,
        lastName,
      }).then(() => {
        fetchUsersData()
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Editable defaultValue={user.email}>
        <EditablePreview />
        <EditableInput
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => handleUpdateUser(user.id!)}
        />
      </Editable>

      <Editable defaultValue={user.firstName}>
        <EditablePreview />
        <EditableInput
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          onBlur={() => handleUpdateUser(user.id!)}
        />
      </Editable>

      <Editable defaultValue={user.lastName}>
        <EditablePreview />
        <EditableInput
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          onBlur={() => handleUpdateUser(user.id!)}
        />
      </Editable>
    </>
  )
}
