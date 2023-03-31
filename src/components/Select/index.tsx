import { FormControl, FormLabel, Tag, Select } from '@chakra-ui/react'

interface SelectUpdateComponentProps {
  tag: string
  value: string
  id: string
  setValue: (event: string) => void
  onBlurAction: (event: string) => void
  defaultName: string
  valuesMap: any
}

export function SelectUpdateComponent({
  tag,
  value,
  id,
  setValue,
  onBlurAction,
  defaultName,
  valuesMap,
}: SelectUpdateComponentProps) {
  return (
    <>
      <FormControl mt={2} isRequired>
        <FormLabel>
          <Tag size={'md'} colorScheme={'orange'}>
            {tag}
          </Tag>
        </FormLabel>
        <Select
          bg={'whiteAlpha.200'}
          color={'white'}
          size={'md'}
          rounded={'md'}
          variant={'outline'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={() => onBlurAction(id)}
        >
          <option style={{ backgroundColor: '#1A202C' }}>{defaultName}</option>
          {valuesMap.map((valueMap: any) => (
            <option
              style={{ backgroundColor: '#4A5568' }}
              key={valueMap.id}
              value={valueMap.id}
            >
              {valueMap.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
