import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    phys: "",
    chem: "",
    math: "",
    comp: "",
    engl: "",
  });

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phys, chem, math, comp, engl } = data;
    try {
      const responce = await axios.post(
        `http://localhost:3000/insert/${name}/${phys}/${chem}/${math}/${comp}/${engl}`
      );
      console.log("data submitted successfully" + responce.data);
    } catch (err) {
      console.error("error subbmitting data" + err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center text-primary">Student Marks Form</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
            />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="physics" className="form-label">
                Physics
              </label>
              <input
                onChange={handleChange}
                type="number"
                className="form-control"
                id="phys"
                placeholder="Marks"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="chemistry" className="form-label">
                Chemistry
              </label>
              <input
                onChange={handleChange}
                type="number"
                className="form-control"
                id="chem"
                placeholder="Marks"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="math" className="form-label">
                Math
              </label>
              <input
                onChange={handleChange}
                type="number"
                className="form-control"
                id="math"
                placeholder="Marks"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="comp" className="form-label">
                Computer
              </label>
              <input
                onChange={handleChange}
                type="number"
                className="form-control"
                id="comp"
                placeholder="Marks"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="english" className="form-label">
                English
              </label>
              <input
                onChange={handleChange}
                type="number"
                className="form-control"
                id="engl"
                placeholder="Marks"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary px-5"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
