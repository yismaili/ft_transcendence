
const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (event.currentTarget.value != "")
      document.getElementsByName(name)[0].focus();
  };

  export default handleChange;