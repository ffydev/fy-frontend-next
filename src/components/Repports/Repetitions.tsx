import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

interface RepetitionsProps {
  repetitions?: number[]
}

export default function Repetitions({ repetitions }: RepetitionsProps) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Valor</Th>
        </Tr>
      </Thead>
      <Tbody>
        {repetitions?.map((valor, index) => (
          <Tr key={index}>
            <Td>{valor}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
