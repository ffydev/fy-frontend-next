import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  TableContainer,
} from '@chakra-ui/react'

export default function Repetitions({ repetitions, categories }: any) {
  const formulas = ['Brzycki', 'Epley', 'Baechle', 'Laenders']
  return (
    <>
      <TableContainer>
        <Heading size="md">Carga Máxima (RM)</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Fórmula</Th>
              {categories?.map((category: any, index: any) => (
                <Th key={index}>{category}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {formulas?.map((formula, formulaIndex) => (
              <Tr key={formulaIndex}>
                <Td>{formula}</Td>
                {categories?.map((_: any, weekIndex: any) => (
                  <Td key={weekIndex}>
                    {repetitions[weekIndex] && repetitions[weekIndex][formula]
                      ? repetitions[weekIndex][formula]
                      : ''}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
