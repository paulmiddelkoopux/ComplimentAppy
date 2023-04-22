import * as Popover from '@radix-ui/react-popover';
import './AddNewCompliment.css'


function AddNewCompliment(){

    return (
        <Popover.Root>
        <Popover.Trigger />
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content>
            Add New
            <Popover.Close />
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
}

export default AddNewCompliment