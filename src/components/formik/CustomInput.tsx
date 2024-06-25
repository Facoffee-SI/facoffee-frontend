import PropType from 'prop-types';

interface CustomInput {
  field: { name: string };
  form: { touched: any; errors: any };
  inputRef: string;
}

const CustomInput = ({
  field,
  form: { touched, errors },
  inputRef,
  ...props
}: CustomInput) => (
  <div className="d-flex flex-column">
    <input
      type="text"
      id={field.name}
      className={`${
        touched[field.name] && errors[field.name] && 'input-error'
      }`}
      ref={inputRef}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] ? (
      <span className="text-danger">{errors[field.name]}</span>
    ) : (
      <></>
    )}
  </div>
);

CustomInput.defaultProps = {
  inputRef: undefined,
};

CustomInput.propTypes = {
  field: PropType.object.isRequired,
  label: PropType.string.isRequired,
  form: PropType.object.isRequired,
  inputRef: PropType.oneOfType([
    PropType.func,
    PropType.shape({ current: PropType.instanceOf(Element) }),
  ]),
};

export default CustomInput;
