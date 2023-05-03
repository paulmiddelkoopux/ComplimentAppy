//ComplimentList.tsx
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useContext } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './ComplimentList.css'
import { ComplimentsContext } from './ComplimentsContext';
import { Compliment } from './ComplimentsContext';

function ComplimentList(){
    const compliments = useContext(ComplimentsContext) ?? [];

    compliments.sort((a: Compliment, b: Compliment) => {
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      } else {
        return 0;
      }
    });


    console.log('ComplimentsContext when rendering List', compliments);
    console.log(Array.isArray(compliments));
    return (
        <div className="complimentList">
              <ScrollArea.Root className="ScrollAreaRoot">
    <ScrollArea.Viewport className="ScrollAreaViewport">
      {<div>
        {compliments.map((compliment: Compliment) => (
    <div className="Compliment" key={compliment.id}>
        {compliment.content}
    </div>
))}
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