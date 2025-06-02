import {useEffect, useState} from "react";
import useLabelsStore from "../store/useLabelsStore.js";

const Labels = () => {
  const {getLabels,labels} = useLabelsStore();

  const [selectedLabel, setSelectedLabel] = useState('');

  useEffect(() => {
    getLabels();
  }, [])

  return (
    <div className="flex flex-col w-130">
      <div className="flex justify-between items-center">
        <button className={`btn btn-soft rounded-md ${selectedLabel ? 'btn-secondary' : 'btn-disabled' }`}>
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
        {labels.map((option) => (
          <div key={option.id} className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="labels"
                className="radio hidden"
                checked={selectedLabel === option.id}
                onChange={() => setSelectedLabel(option.id)}
              />
              <span className={`btn w-30 bg-[${labels.color}]${selectedLabel === option.id ? 'btn-primary' : 'btn-outline'}`}>
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