import { useState } from "react";

const App = () => {

  const [userInput, setUserInput] = useState({
    merk: 1,
    tahunKendaraan: 0,
    kapasitasMesin: 0,
    kilometer: 1,
    lokasi: 1,
  });

  const onHandleSubmitted = (name, value) => {
    setUserInput((prevState) => ({...prevState, [name]: value}))
  }

  const submitForm = () => {
    const convertedInputs = {
      merk: parseInt(userInput.merk),
      tahunKendaraan: parseInt(userInput.tahunKendaraan),
      kapasitasMesin: parseInt(userInput.kapasitasMesin),
      kilometer: parseInt(userInput.kilometer),
      lokasi: parseInt(userInput.lokasi),
    };
    const obj2Arr = [];
    Object.keys(convertedInputs).map((key) => [obj2Arr.push(convertedInputs[key])])
    console.log(obj2Arr);
    // return obj2Arr;
  }

  return (
    <>
      <div className="p-10 h-full">
      <h1 className="text-center text-3xl font-bold text-indigo-600">Deep Learning - Test</h1>
        <div className="flex gap-3">
          <div className="w-full">
              <Select label={"Merk"} name={"merk"} data={['Yamaha', 'Honda', 'Kawasaki', 'Suzuki']} onChange={(value) => onHandleSubmitted("merk", value)}/>
              <Input label={"Tahun Kendaraan"} name={"tahunKendaraan"} onChange={(value) => onHandleSubmitted("tahunKendaraan", value)}/>
              <Input label={"Kapasitas Mesin"} name={"kapasitasMesin"} onChange={(value) => onHandleSubmitted("kapasitasMesin", value)}/>
              <Select label={"Kilometer"} name={"kilometer"} data={['0 - 1000 KM', '1000 - 5000 KM', '5000 - 10000 KM', '10000 - 20000 KM', '30000 KM']} onChange={(value) => onHandleSubmitted("kilometer", value)}/>
              <Select label={"Lokasi"} name={"lokasi"} data={['Jakarta', 'Bandung']} onChange={(value) => onHandleSubmitted("lokasi", value)}/>
              <button onClick={(e) => submitForm(e)} className="mt-12 bg-indigo-800 w-full p-4 rounded-lg text-white font-bold tracking-wider uppercase">Predict</button>
            </div>
            <div className="w-full">

            </div>
        </div>
      </div>
    </>
  );
}

const Input = ({label, name, onChange}) => {
  return (
    <div className="mt-9">
      <label htmlFor={name} className="text-xl text-indigo-700">{label}</label> <br />
        <input type="number" 
      className="w-full p-3.5 mt-2 outline-4 outline-white bg-indigo-500 text-white text-lg rounded-md shadow-lg shadow-indigo-400 focus:outline-none placeholder:text-gray-300"
      name={name}
      placeholder={label}
      required
      onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const Select = ({label, name, data, onChange}) => {
  return (
    <div className="mt-9">
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