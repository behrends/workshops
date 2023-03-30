export default function MultipleChoice({ question, options }) {
  return (
    <div>
      <h2>{question}</h2>
      {options.map((option, index) => {
        const id = `option${index + 1}`;
        return (
          <>
            <input type="radio" id={id} name="option" value={id} />
            <label htmlFor={id}>{option}</label>
            <br />
          </>
        );
      })}
    </div>
  );
}
