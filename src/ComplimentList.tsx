import * as ScrollArea from '@radix-ui/react-scroll-area';
import './ComplimentList.css'


function ComplimentList(){

    return (
        <div>
              <ScrollArea.Root className="ScrollAreaRoot">
    <ScrollArea.Viewport className="ScrollAreaViewport">
        Hoi
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