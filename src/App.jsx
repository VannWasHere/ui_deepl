const App = () => {
  return (
    <div className="p-16">
      <Input label={"Tahun Kendaraan"}/>
    </div>
  );
}

const Input = ({label, name}) => {
  return (
    <>
      <label htmlFor={name} className="text-xl">{label}</label>
        <input type="number" 
      className="w-full p-3.5 mt-2 outline-none bg-indigo-500 focus:outline-none text-white placeholder:text-white rounded-md"
      name={name}
      placeholder={label}/>
    </>
  );
}

export default App;