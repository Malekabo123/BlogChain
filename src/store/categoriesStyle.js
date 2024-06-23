export const style = {
  control: (base) => ({
    ...base,
    borderColor: "#27272a",
    backgroundColor: "transparent",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#e04202",
      cursor: "pointer",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  option: (base) => ({
    ...base,
    backgroundColor: "#27272a",
    "&:hover": {
      backgroundColor: "transparent",
      cursor: "pointer",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#09090b",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
  }),
  menuList: (base) => ({
    ...base,
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#363130",
    },
  }),
};
