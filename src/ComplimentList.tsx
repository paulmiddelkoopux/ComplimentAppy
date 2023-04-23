//ComplimentList.tsx
import { useContext } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './ComplimentList.css'
import { ComplimentsContext } from './ComplimentsContext.js';

function ComplimentList(){
    const compliments = useContext(ComplimentsContext);
    console.log('ComplimentsContext when rendering List', compliments);

    return (
        <div>
              <ScrollArea.Root className="ScrollAreaRoot">
    <ScrollArea.Viewport className="ScrollAreaViewport">
    {compliments.map((compliment) => (
          <div className="Compliment" key={compliment}>
            {compliment.content}
          </div>
        ))}
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