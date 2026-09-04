import { Combobox, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup } from '@/registry/primitives/combobox'

const items = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Combobox items={items}>
        <ComboboxInput placeholder="Combobox (sm)" size="sm" />
        <ComboboxPopup>
          <ComboboxList>
            {items.map((item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>

      <Combobox items={items}>
        <ComboboxInput placeholder="Combobox (default)" size="default" />
        <ComboboxPopup>
          <ComboboxList>
            {items.map((item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>

      <Combobox items={items}>
        <ComboboxInput placeholder="Combobox (lg)" size="lg" />
        <ComboboxPopup>
          <ComboboxList>
            {items.map((item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  )
}
