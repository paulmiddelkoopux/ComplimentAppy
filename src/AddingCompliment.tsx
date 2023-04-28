//AddingCompliments.tsx

import * as Form from '@radix-ui/react-form';
import { useContext } from 'react'
import { addCompliment } from './firestoreService';
import { ComplimentsContext } from './ComplimentsContext';

interface Props {
  userId: string
}

function AddingCompliment({ userId }: Props) {
  const [compliments, setCompliments] = useContext(ComplimentsContext);
  console.log('ComplimentsContext when Adding Compliment', ComplimentsContext);

  const handleSubmit = async (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault();
    const form = event.target;
    const newCompliment = form.compliment.value;
    const result = await addCompliment(userId, newCompliment);
    if (result) {
      form.reset();
      alert('Compliment added successfully!');
      console.log('Is it an array? Lets see:', compliments);
      setCompliments([ComplimentsContext, newCompliment]);
    } else {
      alert('Error adding compliment!');
    }
  };

  return (
    <Form.Root onSubmit={handleSubmit}>
      <Form.Field className="FormField" name="question">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Form.Label className="FormLabel">Compliment</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            What is nice about you?
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