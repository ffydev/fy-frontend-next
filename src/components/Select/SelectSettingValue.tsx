import { FormControl, Select } from '@chakra-ui/react'

interface SelectSettingValueProps {
  tag: string
  setValue: (event: string) => void
  mapValues: any
}

export default function SelectSettingValue({
  tag,
  setValue,
  mapValues,
}: SelectSettingValueProps) {
  return (
    <>
      <FormControl width={'100%'} isRequired>
        <Select
          bgGradient={'linear(to-r, gray.800, gray.900)'}
          variant={'filled'}
          rounded={'lg'}
          boxShadow={'lg'}
          focusBorderColor={'purple.400'}
          size={'md'}
          onChange={(event) => setValue(event.target.value)}
          defaultValue=""
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
              <>{mapValue.name}</>
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
