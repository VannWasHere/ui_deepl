import { useState } from "react";
import axios from "axios";
import Loading from "./images/Components/Loading";

const App = () => {

  // Add loading with state
  const [loading, setLoading] = useState(false);
  const [getData, setData] = useState(0);
  const [userInput, setUserInput] = useState({
    lokasi: 1,
    kapasitasMesin: 110,
    tahunKendaraan: 0,
    kilometer: 1,
    merk: 1,
  });

  const onHandleSubmitted = (name, value) => {
    setUserInput((prevState) => ({...prevState, [name]: value}))
  }

  const submitForm = async () => {
    setLoading(true);
    try {
      const convertedInputs = {
        lokasi: parseInt(userInput.lokasi),
        kapasitasMesin: parseInt(userInput.kapasitasMesin),
        tahunKendaraan: parseInt(userInput.tahunKendaraan),
        kilometer: parseInt(userInput.kilometer),
        merk: parseInt(userInput.merk),
      };
      const obj2Arr = Object.values(convertedInputs);
  
      // Send Post Data
      await sendData(obj2Arr);
      
      // Wait for post data send and receive data with get method
      await receivedData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Unfinished Method
  const showInputData = async () => {

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
        if (response.data && response.data.output) {
          
        // Convert into Formated String
        const raw_respond = parseInt(JSON.parse(response.data.output));
        const result = parseInt(raw_respond) * 1;
        setData(result.toLocaleString('en-US', {useGrouping: true}));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="p-10 h-full">
      <h1 className="text-center text-3xl font-bold text-indigo-600">Deep Learning - Test</h1>
        <div className="flex gap-3 items-center">
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
            <div className="w-full h-full mt-9 p-5 flex justify-center">
              <div className="w-4/5 p-5 m-12 rounded-xl shadow-lg shadow-indigo-900">
                <h1 className="text-3xl font-bold tracking-wide text-center">Data Input</h1>
                <hr className="mt-2"/>
                <div className="flex justify-between">
                  <table className="w-full p-3 table-auto border-slate-700">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      <tr>
                        <td className="text-lg text-indigo-900">Lokasi</td>
                        <td className="text-lg text-indigo-900 text-center w-1/3">Test</td>
                      </tr>
                      <tr>
                        <td className="text-lg text-indigo-900">Kapasitas Mesin</td>
                        <td className="text-lg text-indigo-900 text-center w-1/3">Test</td>
                      </tr>
                      <tr>
                        <td className="text-lg text-indigo-900">Tahun Kendaraan</td>
                        <td className="text-lg text-indigo-900 text-center w-1/3">Test</td>
                      </tr>
                      <tr>
                        <td className="text-lg text-indigo-900">Kilometer</td>
                        <td className="text-lg text-indigo-900 text-center w-1/3">Test</td>
                      </tr>
                      <tr>
                        <td className="text-lg text-indigo-900">Merk</td>
                        <td className="text-lg text-indigo-900 text-center w-1/3">Test</td>
                      </tr>
                      <tr>
                        <td className="text-lg text-indigo-900 border-t-2">Hasil Prediksi Harga</td>
                        <td className="text-lg text-indigo-900 border-t-2 font-bold text-center w-1/3"> {loading ? <Loading/> : `Rp. ${getData}` } </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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