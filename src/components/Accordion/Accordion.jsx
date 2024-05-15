import { useContext, useState, createContext, useMemo } from 'react';
import AccordionItem from './Item/AccordionItem';
import AccordionTitle from './Item/AccordionTitle';
import AccordionContent from './Item/AccordionContent';

const AccordionContext = createContext({
  openItemId: null,
  toggleItem: (id) => {},
  openItem: (id) => {},
  closeItem: () => {},
});

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error('useAccordionContext must be used within an Accordion');
  }

  return ctx;
}

function Accordion({ children, className }) {
  const [openItemId, setOpenItemId] = useState();

  function toggleItem(id) {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  }
  function openItem(id) {
    setOpenItemId(id);
  }

  function closeItem() {
    setOpenItemId(null);
  }

  const contextValue = useMemo(
    () => ({
      openItemId,
      toggleItem,
      openItem,
      closeItem,
    }),
    [openItemId],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

export default Accordion;

// AccordionItem 사용 시 Accordion 안에 사용해야한다는 것을 명시하기 위해 이렇게 선언한다.
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
