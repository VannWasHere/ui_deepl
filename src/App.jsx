import { useState } from "react";

const App = () => {

  const [userInput, setUserInput] = useState({
    merk: 0,
    tahunKendaraan: 0,
    kapasitasMesin: 0,
    kilometer: 0,
    lokasi: 0,
  });

  const onHandleSubmitted = (name, value) => {
    setUserInput((prevState) => ({...prevState, [name]: value}))
  }

  const submitForm = () => {
    console.log(userInput); 
  }

  return (
    <div className="p-10 h-full">
      <h1 className="text-center text-3xl font-bold text-indigo-600">Deep Learning - Test</h1>
      <Select label={"Merk"} name={"merk"} data={['Yamaha', 'Honda', 'Kawasaki', 'Suzuki']} onChange={(value) => onHandleSubmitted("merk", value)}/>
      <Input label={"Tahun Kendaraan"} name={"tahunKendaraan"} onChange={(value) => onHandleSubmitted("tahunKendaraan", value)}/>
      <Input label={"Kapasitas Mesin"} name={"kapasitasMesin"} onChange={(value) => onHandleSubmitted("kapasitasMesin", value)}/>
      <Select label={"Kilometer"} name={"kilometer"} data={['0 - 1000 KM', '1000 - 5000 KM', '5000 - 10000 KM', '10000 - 20000 KM', '30000 KM']} onChange={(value) => onHandleSubmitted("kilometer", value)}/>
      <Select label={"Lokasi"} name={"lokasi"} data={['Jakarta', 'Bandung']} onChange={(value) => onHandleSubmitted("lokasi", value)}/>
      <button onClick={submitForm()} className="mt-12 bg-indigo-800 w-full p-4 rounded-lg text-white font-bold tracking-wider uppercase">Predict</button>
    </div>
  );
}

const Input = ({label, name, onChange}) => {
  return (
    <div className="mt-10">
      <label htmlFor={name} className="text-xl text-indigo-700">{label}</label>
        <input type="number" 
      className="w-full p-3.5 mt-2 outline-4 outline-white bg-indigo-500 text-white text-lg placeholder:text-white rounded-md shadow-lg shadow-indigo-400 focus:outline-none placeholder:text-gray-300"
      name={name}
      placeholder={label}
      onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const Select = ({label, name, data, onChange}) => {
  return (
    <div className="mt-10">
      <label htmlFor={name} className="text-xl text-indigo-700">{label}</label> <br />
      <select name={name} id={name} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3.5 mt-2 outline-4 outline-white bg-indigo-500 text-white text-lg placeholder:text-white rounded-md shadow-lg shadow-indigo-400 focus:outline-none">
      
        {data.map((item, key) => (
          <option key={key} value={key + 1} 
          className="">{item}</option>
        ))}
      
      </select>
    </div>
  );
}

export default App;