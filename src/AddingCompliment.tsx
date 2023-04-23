import * as Form from '@radix-ui/react-form';
import { addCompliment } from './firestoreService';

function AddingCompliment({ userId }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const compliment = form.compliment.value;
    const result = await addCompliment(userId, compliment);
    if (result) {
      form.reset();
      alert('Compliment added successfully!');
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