import { FormControl, FormLabel, Tag, Select } from '@chakra-ui/react'

interface SelectComponentProps {
  tag: string
  value: string
  id: string
  setValue: (event: string) => void
  onBlurAction: (event: string) => void
  defaultName: string
  defaultId: string
  valuesMap: any
}

export function SelectComponent({
  tag,
  value,
  id,
  setValue,
  onBlurAction,
  defaultName,
  defaultId,
  valuesMap,
}: SelectComponentProps) {
  return (
    <>
      <FormControl mt={2} isRequired>
        <FormLabel>
          <Tag size={'md'} colorScheme={'orange'} variant={'subtle'}>
            {tag}
          </Tag>
        </FormLabel>
        <Select
          size={'sm'}
          rounded={'lg'}
          variant={'filled'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={() => onBlurAction(id)}
        >
          <option>{defaultName}</option>
          {valuesMap.map((valueMap: any) => (
            <option
              key={valueMap.id}
              value={valueMap.id ? valueMap.id : { defaultId }}
            >
              {valueMap.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
