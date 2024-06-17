import React, { useEffect, useState } from "react";
import { https } from "../../service/api";

export default function ThearerComplex(props) {
  const { value, onSelect } = props;
  const [complex, setComplex] = useState([]);
  const [selectedComplex, setSelectedComplex] = useState(null);

  useEffect(() => {
    if (value) {
      https
        .get(
          `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${value}`
        )
        .then((res) => {
          console.log(res.data);
          setComplex(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);

  const handleComplexChange = (event) => {
    const selectedComplexId = event.target.value;
    setSelectedComplex(complex.find((cumRap) => cumRap.maCumRap === selectedComplexId));
  };
  return (
    <div className="flex flex-col space-y-4">

    <select onChange={handleComplexChange} name="cumRap" className="form-select">
      <option value="">Chọn cụm rạp</option>
      {complex.map((cumRap) => (
        <option value={cumRap.maCumRap} key={cumRap.maCumRap}>
          {cumRap.tenCumRap}
        </option>
      ))}
    </select>

    {selectedComplex && (
        <select onChange={onSelect} name="maRap" className="form-select">
          {selectedComplex.danhSachRap.map((rap) => (
            <option value={rap.maRap} key={rap.maRap}>
              {rap.tenRap}
            </option>
          ))}
        </select>
      )}
    </div>

    
  );
}
