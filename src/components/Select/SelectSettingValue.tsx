import { FormControl, Select } from '@chakra-ui/react'

interface SelectSettingValueProps {
  tag: string
  value: string
  setValue: (event: string) => void
  mapValues: any
}

export default function SelectSettingValue({
  tag,
  value,
  setValue,
  mapValues,
}: SelectSettingValueProps) {
  return (
    <>
      <FormControl isRequired>
        <Select
          size={'md'}
          border={'1px'}
          borderColor={'whiteAlpha.900'}
          variant={'outline'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={tag}
        >
          {mapValues.map((mapValue: any) => (
            <option
              style={{ backgroundColor: '#4A5568' }}
              key={mapValue.id}
              value={mapValue.id}
            >
              {mapValue.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
