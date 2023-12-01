import { useState } from "react";
import axios from "axios";

const App = () => {

  const [getData, setData] = useState(null);

  const [userInput, setUserInput] = useState({
    lokasi: 1,
    kapasitasMesin: 0,
    tahunKendaraan: 0,
    kilometer: 1,
    merk: 1,
  });

  const onHandleSubmitted = (name, value) => {
    setUserInput((prevState) => ({...prevState, [name]: value}))
  }

  const submitForm = async () => {
    const convertedInputs = {
      lokasi: parseInt(userInput.lokasi),
      kapasitasMesin: parseInt(userInput.kapasitasMesin),
      tahunKendaraan: parseInt(userInput.tahunKendaraan),
      kilometer: parseInt(userInput.kilometer),
      merk: parseInt(userInput.merk),
    };
    const obj2Arr = Object.values(convertedInputs);
    await sendData(obj2Arr);
    await receivedData();
  }

  const sendData = async (formData) => {
    try {
      await axios.post('http://localhost:5000/check', {
        data: formData,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };
  
  const receivedData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sendData', {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if(response.data && response.data.data) setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(getData);

  return (
    <>
      <div className="p-10 h-full">
      <h1 className="text-center text-3xl font-bold text-indigo-600">Deep Learning - Test</h1>
        <div className="flex gap-3">
            <div method="post" className="w-full">

              <Select label={"Lokasi"} name={"lokasi"} 
              data={['Kota Jakarta Barat', 'Kab. Tangerang', 'Kota Jakarta Selatan', 'Kota Bandung', 'Kota Jakarta Timur', 'Kab. Bogor', 'Kota Jakarta Utara', 'Kota Medan',
              'Kota Tangerang', 'Kab. Bandung', 'Kota Batam', 'Kota Tangerang Selatan', 'Kota Bekasi', 'Kota Depok', 'Kota Surabaya', 'Kab. Deli Serdang']} 
              onChange={(value) => onHandleSubmitted("lokasi", value)}/>

              <SelectCC label={"Kapasitas Mesin"} name={"kapasitasMesin"}
              data={['110cc', '115cc', '125cc', '150cc', '155cc', '160cc', '175cc', '220cc', '250cc', '600cc', '900cc']}
              onChange={(value) => onHandleSubmitted("kapasitasMesin", value)}/>

              <Input label={"Tahun Kendaraan"} name={"tahunKendaraan"} onChange={(value) => onHandleSubmitted("tahunKendaraan", value)}/>
              <Select label={"Kilometer"} name={"kilometer"} data={['0 - 1000 KM', '1000 - 5000 KM', '5000 - 10000 KM', '10000 - 20000 KM', '30000 KM']} onChange={(value) => onHandleSubmitted("kilometer", value)}/>
              <Select label={"Merk"} name={"merk"} data={['Yamaha', 'Honda', 'Kawasaki', 'Suzuki']} onChange={(value) => onHandleSubmitted("merk", value)}/>
              <button onClick={(e) => submitForm(e)} className="mt-12 bg-indigo-800 w-full p-4 rounded-lg text-white font-bold tracking-wider uppercase">Predict</button>
            </div>
            <div className="w-full mt-9 p-5">
              <div className=""></div>
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

const SelectCC = ({label, name, data, onChange}) => {
  return (
    <div className="mt-9">
      <label htmlFor={name} className="text-xl text-indigo-700">{label}</label> <br />
      <select name={name} id={name} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3.5 mt-2 outline-4 outline-white bg-indigo-500 text-white text-lg placeholder:text-white rounded-md shadow-lg shadow-indigo-400 focus:outline-none">
      
        {data.map((item, key) => (
          <option key={key} value={item} 
          className="">{item}</option>
        ))}
      
      </select>
    </div>
  );
}

export default App;