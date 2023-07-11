import * as Form from '@radix-ui/react-form';
import { useContext, useRef } from 'react';
import { addCompliment } from './firestoreService';
import { ComplimentsContext } from './ComplimentsContext';

function AddingCompliment({ userId }: { userId: string }) {
  const {compliments, setCompliments} = useContext(ComplimentsContext) || { compliments: null, setCompliments: null };
  console.log('ComplimentsContext when Adding Compliment', compliments);
  console.log('userId for Addingcompliment:', userId);

  // Create a ref for the form
  const formRef = useRef(null);

  const handleSubmit = async () => {
    // Get the form and the new compliment from the formRef
    const form = formRef.current;
    const newCompliment = form.compliment.value as string;
  
    try {
      const result = await addCompliment(userId, newCompliment);
      console.log('Result from addCompliment:', result);
      if (result) {
        form.reset();
        alert('Compliment added successfully!');
        setCompliments([...compliments, result]);
      } else {
        alert('Error adding compliment!');
      }
    } catch (error) {
      console.error('Error in addCompliment:', error);
      alert('Error adding compliment!');
    }
  };
  
  return (
    <Form.Root className="addingCompliment" onSubmit={(event) => { event.preventDefault(); handleSubmit(); }} ref={formRef}>
      <Form.Field className="FormField" name="question">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Form.Label className="FormLabel">What is nice about you?</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please add a compliment
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea 
            className="Textarea" 
            name="compliment" 
            required 
            onKeyDown={(event) => {
              if (event.key === 'Enter' && event.ctrlKey) {
                // ...
              } else if (event.key === 'Enter') {
                event.preventDefault();
                // Call handleSubmit
                handleSubmit();
              }
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="Button" style={{ marginTop: 10 }}>
          Add compliment
        </button>
      </Form.Submit>
    </Form.Root>
  );  
}


export default AddingCompliment;
