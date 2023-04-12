import { FormControl, FormLabel, Tag, Select } from '@chakra-ui/react'

interface SelectUpdateComponentComponentProps {
  tag: string
  value: string
  id: string
  setValue: (event: string) => void
  onBlurAction: (event: string) => void
  defaultName: string
  valuesMap: any
}

export function SelectUpdate({
  tag,
  value,
  id,
  setValue,
  onBlurAction,
  defaultName,
  valuesMap,
}: SelectUpdateComponentComponentProps) {
  return (
    <>
      <FormControl mt={2}>
        <FormLabel>
          <Tag size={'md'} bgGradient={'gray'}>
            {tag}
          </Tag>
        </FormLabel>
        <Select
          bg={'whiteAlpha.100'}
          color={'white'}
          size={'md'}
          rounded={'md'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onMouseOverCapture={() => onBlurAction(id)}
        >
          <option style={{ backgroundColor: '#1A202C' }}>{defaultName}</option>
          {valuesMap.map((valueMap: any) => (
            <option
              key={valueMap.id}
              value={valueMap.id}
              onClick={() => setValue(valueMap.id)}
            >
              <div style={{ backgroundColor: '#4A5568' }}>{valueMap.name}</div>
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
