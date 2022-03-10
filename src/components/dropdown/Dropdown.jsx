import Select from "react-select";
import "./dropdown.scss";

function Dropdown({ listOptionOfSelect, eventOnChange, indexChap }) {
  const listNewOptionOfSelect = listOptionOfSelect.current.map((chap) => {
    return {
      value: chap.getAttribute("href"),
      label: chap.innerText,
    };
  });
  return (
    <div className='chapter-select'>
      <Select
        options={listNewOptionOfSelect}
        isSearchable={true}
        onChange={eventOnChange}
        value={listNewOptionOfSelect[indexChap]}
      />
    </div>
  );
}

export default Dropdown;
