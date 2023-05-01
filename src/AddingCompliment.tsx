import * as Form from '@radix-ui/react-form';
import { useContext, useEffect, createContext } from 'react';
import { addCompliment } from './firestoreService';
import { ComplimentsContext } from './ComplimentsContext';

function AddingCompliment(userId: string) {
  const {compliments, setCompliments} = useContext(ComplimentsContext) || [];
  console.log('ComplimentsContext when Adding Compliment', compliments);
  // const setCompliments = createContext(ComplimentsContext) || [];

  const handleSubmit = async (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault();
    const form = event.target;
    const newCompliment = form.compliment.value;
    const result = await addCompliment(userId, newCompliment);
    if (result) {
      form.reset();
      alert('Compliment added successfully!');
      setCompliments([...compliments, newCompliment]);
    } else {
      alert('Error adding compliment!');
    }
  };

  return (
    <Form.Root className="addingCompliment" onSubmit={handleSubmit}>
      <Form.Field className="FormField" name="question">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Form.Label className="FormLabel">What is nice about you?</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please add a compliment
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea className="Textarea" name="compliment" required />
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
