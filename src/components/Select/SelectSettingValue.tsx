import { FormControl, Select } from '@chakra-ui/react'

interface SelectSettingValueProps {
  tag: string
  setValue: (event: string) => void
  mapValues: any
  borderColor?: string
}

export default function SelectSettingValue({
  tag,
  setValue,
  mapValues,
  borderColor,
}: SelectSettingValueProps) {
  return (
    <>
      <FormControl isRequired>
        <Select
          bgGradient={'transparent'}
          size={'md'}
          border={'1px'}
          borderColor={borderColor}
          variant={'outline'}
          onChange={(event) => setValue(event.target.value)}
          defaultValue=""
          isRequired
        >
          <option style={{ backgroundColor: '#322659' }} value="">
            {tag}
          </option>
          {mapValues.map((mapValue: any) => (
            <option
              style={{ backgroundColor: '#322659' }}
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
