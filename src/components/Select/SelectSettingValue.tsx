import { FormControl, Select } from '@chakra-ui/react'

interface SelectSettingValueProps {
  tag: string
  value: string
  setValue: (event: string) => void
  mapValues: any
  borderColor?: string
}

export default function SelectSettingValue({
  tag,
  value,
  setValue,
  mapValues,
  borderColor,
}: SelectSettingValueProps) {
  return (
    <>
      <FormControl isRequired>
        <Select
          size={'md'}
          border={'1px'}
          borderColor={borderColor}
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
