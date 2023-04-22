import * as Dialog from '@radix-ui/react-dialog';
import AddingCompliment from './AddingCompliment';
import './AddNewCompliment.css'


function AddNewCompliment(){

    return (
      <Dialog.Root>
      <Dialog.Trigger>
        Add new compliment
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay"/>
        <Dialog.Content className="DialogContent">
          <Dialog.Title />
          <Dialog.Description />
          <AddingCompliment />
          <Dialog.Close className="DialogClose"/>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    )
}

export default AddNewCompliment