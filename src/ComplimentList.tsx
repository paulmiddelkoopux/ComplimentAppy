//ComplimentList.tsx
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useContext } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './ComplimentList.css'
import { ComplimentsContext } from './ComplimentsContext';

function ComplimentList(){
    const compliments = useContext(ComplimentsContext) ?? [];

    compliments.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log('ComplimentsContext when rendering List', compliments);
    console.log(Array.isArray(compliments));
    return (
        <div className="complimentList">
              <ScrollArea.Root className="ScrollAreaRoot">
    <ScrollArea.Viewport className="ScrollAreaViewport">
      {<div>
        {compliments.map((compliment: { id: string; content: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (
  <div className="Compliment" key={compliment.id}>
    {compliment.content}
  </div>
), (compliment) => compliment)}

        </div>}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="ScrollAreaCorner" />
  </ScrollArea.Root>
        </div>
    )
}

export default ComplimentList