import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from '@/registry/primitives/accordion'

export default function Particle() {
  return (
    <Accordion className="w-full" multiple defaultValue={['item-1', 'item-2']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Your Accordion Title Goes Here</AccordionTrigger>
        <AccordionPanel>
          This is where your accordion content will appear. You can customize this text with any message.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Your Accordion Title Goes Here</AccordionTrigger>
        <AccordionPanel>
          This is where your accordion content will appear. You can customize this text with any message.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Your Accordion Title Goes Here</AccordionTrigger>
        <AccordionPanel>
          This is where your accordion content will appear. You can customize this text with any message.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
