import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from '@/registry/primitives/autocomplete'

const items = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Autocomplete items={items}>
        <AutocompleteInput placeholder="Autocomplete (sm)" size="sm" />
        <AutocompletePopup>
          <AutocompleteList>
            {items.map((item) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>

      <Autocomplete items={items}>
        <AutocompleteInput placeholder="Autocomplete (default)" size="default" />
        <AutocompletePopup>
          <AutocompleteList>
            {items.map((item) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>

      <Autocomplete items={items}>
        <AutocompleteInput placeholder="Autocomplete (lg)" size="lg" />
        <AutocompletePopup>
          <AutocompleteList>
            {items.map((item) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  )
}
