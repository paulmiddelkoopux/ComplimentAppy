import * as Form from '@radix-ui/react-form';


function AddingCompliment () {

    return (
        <Form.Root>
          <Form.Field className="FormField" name="question">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Form.Label className="FormLabel">Compliment</Form.Label>
        <Form.Message className="FormMessage" match="valueMissing">
          What is nice about you?
        </Form.Message>
      </div>
      <Form.Control asChild>
        <textarea className="Textarea" required />
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

export default AddingCompliment