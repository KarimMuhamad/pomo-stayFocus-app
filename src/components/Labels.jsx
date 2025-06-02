import {useState} from "react";

const Labels = () => {
  const options = [
    { id: 'label1', name: 'Label Satu' },
    { id: 'label2', name: 'Label Dua' },
    { id: 'label3', name: 'Label Tiga' },
    { id: 'label4', name: 'Label Empat' },
    { id: 'label5', name: 'Label Lima' },
    { id: 'label6', name: 'Label Enam' },
    { id: 'label7', name: 'Label Tujuh' },
    { id: 'label8', name: 'Label Delapan' },
    { id: 'label9', name: 'Label Sembilan' },
    { id: 'label10', name: 'Label Sepuluh' },
  ];

  const [selectedLabel, setSelectedLabel] = useState('');

  return (
    <div className="flex flex-col w-130">
      <div className="flex justify-between items-center">
        <button className="btn btn-soft btn-secondary rounded-md">
          <i className='bx  bx-trash-x text-2xl'/>
        </button>
        <div className="bg-gray-800 rounded-md px-4 py-1 border border-gray-700">
          <span className="font-semibold">Labels</span>
        </div>
        <button className="btn btn-soft btn-accent rounded-md">
          <i className='bx bx-plus text-2xl'/>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-4">
        {options.map((option) => (
          <div key={option.id} className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="labels"
                className="radio hidden"
                checked={selectedLabel === option.id}
                onChange={() => setSelectedLabel(option.id)}
              />
              <span className={`btn w-30 ${selectedLabel === option.id ? 'btn-primary' : 'btn-outline'}`}>
                {option.name}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labels;