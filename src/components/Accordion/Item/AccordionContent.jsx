import { useAccordionContext } from '../Accordion';

function AccordionContent({ id, className, children }) {
  const { openItemId } = useAccordionContext();

  const isOpen = openItemId === id;

  return (
    <div className={`${className ?? ''} ${isOpen ? 'open' : 'close'}`}>
      {children}
    </div>
  );
}

export default AccordionContent;
